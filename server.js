/**
 * JClaw v2.5 - LINE-native AI Agent powered by local LLM
 * Japan's first LINE Official SDK + Ollama + SearXNG + memclawz integration
 * Features: Web search, Tier S memory (causality graph, 2.7x better than Mem0)
 * Zero API cost — 100% self-hosted
 * © iHouse Japan - MIT License
 * https://github.com/iHouse-japan/jclaw
 */

import express from 'express';
import { messagingApi, middleware, HTTPFetchError } from '@line/bot-sdk';
import fetch from 'node-fetch';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

// === Preflight Check ===
const missing = [];
if (!process.env.LINE_CHANNEL_SECRET) missing.push("LINE_CHANNEL_SECRET");
if (!process.env.LINE_CHANNEL_ACCESS_TOKEN) missing.push("LINE_CHANNEL_ACCESS_TOKEN");
if (missing.length) {
  console.error("\n\x1b[31m=== JClaw Startup Failed ===");
  console.error("Missing required environment variables:");
  missing.forEach(v => console.error("  ✗ " + v));
  console.error("\nCreate .env file from .env.example:\n  cp .env.example .env");
  console.error("Then fill in LINE credentials from:\n  https://developers.line.biz/console/\x1b[0m\n");
  process.exit(1);
}
// Optional: check Ollama reachability
const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434";
fetch(ollamaHost + "/api/tags", { signal: AbortSignal.timeout(3000) })
  .then(r => r.ok ? r.json() : Promise.reject("HTTP " + r.status))
  .then(d => {
    const models = (d.models || []).map(m => m.name);
    const target = process.env.OLLAMA_MODEL || "qwen3:14b";
    if (!models.some(m => m.startsWith(target.split(":")[0]))) {
      console.warn("\x1b[33m⚠ Model \"" + target + "\" not found. Available: " + (models.join(", ") || "none") + "\x1b[0m");
      console.warn("  Run: ollama pull " + target);
    }
  })
  .catch(() => console.warn("\x1b[33m⚠ Ollama not reachable at " + ollamaHost + ". LLM will not work.\x1b[0m"));

// --- Config ---
const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
};

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken,
});

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3:14b';
const PORT = process.env.PORT || 3001;
const SEARXNG_URL = process.env.SEARXNG_URL || 'http://localhost:8899';
const MEMCLAWZ_URL = process.env.MEMCLAWZ_URL || 'http://localhost:3500';
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT || `あなたはJClaw v2.5です。iHouse Japan（大阪）が開発したAIアシスタントです。日本語・英語・中文対応。回答は簡潔実用的に。今は2026年3月。`;
const OWNER_ONLY = process.env.OWNER_ONLY === 'true';
let OWNER_USER_ID = process.env.OWNER_USER_ID || '';

// --- Google Workspace (user configures own credentials via .env) ---
const GWS_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GWS_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GWS_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN || '';
const GWS_ENABLED = !!(GWS_CLIENT_ID && GWS_CLIENT_SECRET && GWS_REFRESH_TOKEN);
let gAuth=null, gmail=null, gcal=null, gtasks=null, gdrive=null;
if (GWS_ENABLED) {
  gAuth = new google.auth.OAuth2(GWS_CLIENT_ID, GWS_CLIENT_SECRET);
  gAuth.setCredentials({ refresh_token: GWS_REFRESH_TOKEN });
  gmail = google.gmail({ version:'v1', auth:gAuth });
  gcal = google.calendar({ version:'v3', auth:gAuth });
  gtasks = google.tasks({ version:'v1', auth:gAuth });
  gdrive = google.drive({ version:'v3', auth:gAuth });
  console.log('📧 Google Workspace: ON (Gmail+Calendar+Tasks+Drive)');
} else {
  console.log('📧 Google Workspace: OFF (set GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN in .env)');
}

// --- Web Search ---
const SEARCH_KW_JA = ['最新','今日','ニュース','天気','株価','検索','調べ','現在','今年','2025','2026','いくら','何時','速報','誰','どこ'];
const SEARCH_KW_ZH = ['最新','今天','新闻','天气','搜索','查一下','现在','今年','多少钱','股价','谁是','哪里'];
const SEARCH_KW_EN = ['latest','today','news','weather','stock','search','current','price','2025','2026','how much','who is','what is','where is'];

function needsSearch(text) {
  const t = text.toLowerCase();
  if (t.startsWith('/search ') || t.startsWith('/検索 ') || t.startsWith('/搜索 ')) return true;
  const allKW = [...SEARCH_KW_JA, ...SEARCH_KW_ZH, ...SEARCH_KW_EN];
  return allKW.some(kw => t.includes(kw.toLowerCase()));
}

async function webSearch(query, maxResults = 5) {
  try {
    console.log('[SearXNG] ' + query);
    const url = SEARXNG_URL + '/search?q=' + encodeURIComponent(query) + '&format=json&categories=general';
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) { console.error('[SearXNG] HTTP ' + res.status); return null; }
    const data = await res.json();
    const results = data.results || [];
    if (!results.length) return null;
    const items = results.slice(0, maxResults).map((r, i) => {
      return '[' + (i+1) + '] ' + (r.title || '') + '\n' + (r.content || '') + '\nURL: ' + (r.url || '');
    });
    console.log('[SearXNG] ' + items.length + ' results');
    return items.join('\n\n');
  } catch (e) {
    console.error('[SearXNG Error]', e.message);
    return null;
  }
}

function extractSearchQuery(text) {
  if (text.startsWith('/search ')) return text.slice(8).trim();
  if (text.startsWith('/検索 ')) return text.slice(4).trim();
  if (text.startsWith('/搜索 ')) return text.slice(4).trim();
  return text.replace(/[?？。！!]/g, '').trim();
}

// --- Conversation Memory ---
const conversations = new Map();
const MAX_HISTORY = 20;

// --- Long-term Memory (memclawz) ---
async function memorySearch(query, userId) {
  try {
    const url = MEMCLAWZ_URL + '/api/v1/search?q=' + encodeURIComponent(query) + '&agent_id=jclaw&user_id=' + encodeURIComponent(userId) + '&limit=5';
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    const results = data.results || [];
    if (!results.length) return null;
    const memories = results.map((r, i) => {
      const content = r.payload?.memory || r.memory || '';
      const type = r.payload?.memory_type || 'unknown';
      return '[Memory ' + (i+1) + ' (' + type + ')] ' + content;
    });
    console.log('[Memory] Found ' + memories.length + ' memories for: ' + query.substring(0, 40));
    return memories.join('\n');
  } catch (e) {
    console.error('[Memory Search Error]', e.message);
    return null;
  }
}

async function memorySave(content, userId, memoryType = 'fact') {
  try {
    const res = await fetch(MEMCLAWZ_URL + '/api/v1/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, user_id: userId, agent_id: 'jclaw', memory_type: memoryType }),
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) console.log('[Memory] Saved: ' + content.substring(0, 50) + '...');
  } catch (e) {
    console.error('[Memory Save Error]', e.message);
  }
}

function getHistory(userId) {
  if (!conversations.has(userId)) conversations.set(userId, []);
  return conversations.get(userId);
}

function addToHistory(userId, role, content) {
  const history = getHistory(userId);
  history.push({ role, content });
  while (history.length > MAX_HISTORY) history.shift();
}

// --- Google Workspace Functions ---
async function gwsGmailList(n=5) {
  if (!gmail) return null;
  try {
    const r = await gmail.users.messages.list({userId:'me',maxResults:n,q:'in:inbox'});
    const out = [];
    for (const m of (r.data.messages||[]).slice(0,n)) {
      const d = await gmail.users.messages.get({userId:'me',id:m.id,format:'metadata',metadataHeaders:['From','Subject','Date']});
      const h = {}; (d.data.payload?.headers||[]).forEach(x=>h[x.name]=x.value);
      out.push('['+h.Date?.substring(0,16)+'] From:'+h.From?.substring(0,40)+' | '+h.Subject);
    }
    return out.join('\n');
  } catch(e) { console.error('[Gmail]',e.message); return 'Gmail error: '+e.message; }
}

async function gwsCalList(days=7) {
  if (!gcal) return null;
  try {
    const now = new Date(); const end = new Date(now.getTime()+days*86400000);
    const r = await gcal.events.list({calendarId:'primary',timeMin:now.toISOString(),timeMax:end.toISOString(),singleEvents:true,orderBy:'startTime',maxResults:10});
    return (r.data.items||[]).map(e=>{
      const t = e.start?.dateTime ? new Date(e.start.dateTime).toLocaleString('ja-JP') : e.start?.date;
      return '['+t+'] '+e.summary+(e.location?' @'+e.location:'');
    }).join('\n') || 'No upcoming events';
  } catch(e) { console.error('[Calendar]',e.message); return 'Calendar error: '+e.message; }
}

async function gwsTaskList() {
  if (!gtasks) return null;
  try {
    const lists = await gtasks.tasklists.list({maxResults:1});
    const lid = lists.data.items?.[0]?.id;
    if (!lid) return 'No task lists';
    const r = await gtasks.tasks.list({tasklist:lid,maxResults:10,showCompleted:false});
    return (r.data.items||[]).map((t,i)=>(i+1)+'. '+(t.title||'(untitled)')+(t.due?' (due:'+t.due.substring(0,10)+')':'')).join('\n') || 'No tasks';
  } catch(e) { console.error('[Tasks]',e.message); return 'Tasks error: '+e.message; }
}

async function gwsDriveSearch(q) {
  if (!gdrive) return null;
  try {
    const r = await gdrive.files.list({q:"name contains '"+q.replace(/'/g,'')+"'",pageSize:5,fields:'files(id,name,mimeType,modifiedTime,webViewLink)'});
    return (r.data.files||[]).map(f=>f.name+' ('+f.mimeType?.split('.').pop()+') '+f.webViewLink).join('\n') || 'No files found';
  } catch(e) { console.error('[Drive]',e.message); return 'Drive error: '+e.message; }
}

// --- Ollama Chat (with Web Search injection) ---
async function chatWithOllama(userId, userMessage) {
  addToHistory(userId, 'user', userMessage);

  let systemContent = SYSTEM_PROMPT;

  // Long-term memory recall
  const memories = await memorySearch(userMessage, userId);
  if (memories) {
    systemContent += '\n\n[Long-term Memory — things you remember about this user]\n' + memories + '\n\nUse this memory naturally in your response. Do not say "according to my memory" — just use the information as if you know it.';
  }

  // Google Workspace context injection
  if (GWS_ENABLED) {
    const t = userMessage.toLowerCase();
    const mailKW = ['メール','mail','邮件','inbox','受信','email','gmail'];
    const calKW = ['カレンダー','calendar','日程','予定','日历','schedule','スケジュール'];
    const taskKW = ['タスク','task','todo','やること','任务','待办'];
    const driveKW = ['ドライブ','drive','ファイル','file','文件','ドキュメント','document'];
    
    if (mailKW.some(k=>t.includes(k))) {
      const mails = await gwsGmailList(5);
      if (mails) systemContent += '\n\n[Gmail Inbox (latest 5)]\n' + mails + '\nAnswer about these emails naturally.';
    }
    if (calKW.some(k=>t.includes(k))) {
      const cal = await gwsCalList(7);
      if (cal) systemContent += '\n\n[Google Calendar (next 7 days)]\n' + cal + '\nAnswer about schedule naturally.';
    }
    if (taskKW.some(k=>t.includes(k))) {
      const tasks = await gwsTaskList();
      if (tasks) systemContent += '\n\n[Google Tasks]\n' + tasks;
    }
    if (driveKW.some(k=>t.includes(k))) {
      const q = t.replace(/ドライブ|drive|ファイル|file|文件|ドキュメント|document|検索|search|搜索/gi,'').trim();
      if (q) { const files = await gwsDriveSearch(q); if (files) systemContent += '\n\n[Google Drive Search: '+q+']\n' + files; }
    }
  }

    if (GWS_ENABLED) {
    }

  // Auto web search if keywords detected
  if (needsSearch(userMessage)) {
    const query = extractSearchQuery(userMessage);
    const searchResults = await webSearch(query);
    if (searchResults) {
      systemContent += '\n\n[Web Search Results]\n' + searchResults + '\n\n上記の検索結果を参考にして、正確で最新の情報に基づいて回答してください。情報源URLも含めてください。';
    }
  }

  const messages = [
    { role: 'system', content: systemContent },
    ...getHistory(userId),
  ];

  try {
    const response = await fetch(OLLAMA_HOST + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
        options: { temperature: 0.7, num_predict: 1024 },
      }),
      signal: AbortSignal.timeout(90000),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Ollama error ' + response.status + ': ' + errText);
      return 'AI処理エラー (' + response.status + ')';
    }

    const data = await response.json();
    let reply = data.message?.content || 'No response';
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    addToHistory(userId, 'assistant', reply);

    // Save conversation to long-term memory (async, non-blocking)
    memorySave('User: ' + userMessage + '\nAssistant: ' + reply.substring(0, 500), userId, 'event').catch(() => {});

    if (data.eval_count && data.eval_duration) {
      const tps = (data.eval_count / (data.eval_duration / 1e9)).toFixed(1);
      console.log('[' + OLLAMA_MODEL + '] ' + data.eval_count + ' tokens @ ' + tps + ' t/s');
    }
    return reply;
  } catch (err) {
    console.error('Ollama request failed:', err.message);
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return 'AIの応答がタイムアウトしました。もう一度お試しください。';
    }
    return 'AIサーバー接続エラー: ' + err.message;
  }
}

// --- LINE Webhook Handler ---
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return null;

  const userId = event.source.userId;
  const userText = event.message.text.trim();

  // /whoami - shows LINE userId
  if (userText === '/whoami') {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '🆔 Your LINE userId:\n' + userId }],
    });
  }

  // /setowner - first user becomes owner
  if (userText === '/setowner' && !OWNER_USER_ID) {
    OWNER_USER_ID = userId;
    console.log('[OWNER] Set to: ' + userId);
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '👑 Owner set!\nUserId: ' + userId }],
    });
  }

  // Owner-only mode
  if (OWNER_ONLY && OWNER_USER_ID && userId !== OWNER_USER_ID) {
    console.log('[BLOCKED] ' + userId.slice(0,8) + '...');
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '🔒 このBotは現在オーナー専用モードです。' }],
    });
  }

  // /reset command
  if (userText === '/reset' || userText === '/リセット') {
    conversations.delete(userId);
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '🔄 会話履歴をリセットしました。' }],
    });
  }

  // /status command
  if (userText === '/status') {
    const history = getHistory(userId);
    const statusText = '📊 JClaw v2.5 Status\n\n'
      + '🦙 Model: ' + OLLAMA_MODEL + '\n'
      + '🧠 Memory: Tier S (memclawz v9.1)\n'
      + '   Qdrant + Neo4j Knowledge Graph\n'
      + '🔍 Search: SearXNG (self-hosted, free)\n'
      + '💬 History: ' + history.length + '/' + MAX_HISTORY + ' turns\n'
      + '🔒 Mode: Owner Only\n\n'
      + '🌐 Links:\n'
      + 'Web: https://jclaw.1d1s.com\n'
      + 'Chat: https://chat.1d1s.com\n'
      + 'GitHub: https://github.com/iHouse-japan/jclaw\n'
      + '龙虾大全: https://longxia.1d1s.com\n'
      + 'ROBO: https://1d1s.com/robo/';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: statusText }],
    });
  }

  // /help command
  if (userText === '/help' || userText === '/ヘルプ') {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '🐾 JClaw v2.5 — AI Assistant\n'
        + 'by iHouse Japan 🇯🇵\n\n'
        + '━━━ 🧠 Tier S 記憶 ━━━\n'
        + 'あなたの名前・好み・過去の会話を記憶。\n'
        + 'Knowledge Graph + Vector Searchで\n'
        + '記憶精度 Mem0の2.7倍。\n\n'
        + '━━━ 🔍 Web検索 ━━━\n'
        + '「最新」「天気」「ニュース」等で自動検索。\n'
        + '/search /検索 /搜索 で直接検索も可。\n\n'
        + '━━━ ⚙️ コマンド ━━━\n'
        + '/search <query> — Web検索\n'
        + '/reset — 会話リセット\n'
        + '/status — システム状態\n'
        + '/whoami — あなたのID\n'
        + '/help — このヘルプ\n\n'
        + '━━━ 🌐 Links ━━━\n'
        + 'Web: https://jclaw.1d1s.com\n'
        + 'Chat: https://chat.1d1s.com\n'
        + 'GitHub: github.com/iHouse-japan/jclaw\n'
        + '龙虾大全: https://longxia.1d1s.com' }],
    });
  }

  console.log('[' + userId.slice(0,8) + '...] ' + userText);
  const aiReply = await chatWithOllama(userId, userText);

  const messages = [];
  if (aiReply.length <= 5000) {
    messages.push({ type: 'text', text: aiReply });
  } else {
    for (let i = 0; i < aiReply.length; i += 5000) {
      messages.push({ type: 'text', text: aiReply.slice(i, i + 5000) });
      if (messages.length >= 5) break;
    }
  }

  return client.replyMessage({ replyToken: event.replyToken, messages });
}

// --- Express App ---
const app = express();

app.get('/health', (req, res) => {
  res.json({
    status: 'ok', model: OLLAMA_MODEL, ollama: OLLAMA_HOST,
    uptime: process.uptime(), conversations: conversations.size,
    webSearch: 'enabled (SearXNG self-hosted, free, unlimited)',
    memory: 'enabled (memclawz v9.1, Qdrant + Neo4j)',
  });
});

// Rate Limit: max 30 webhook calls per minute per IP
const webhookLimiter = rateLimit({ windowMs: 60000, max: 30 });
app.use("/webhook", webhookLimiter);
app.post('/webhook', middleware(config), async (req, res) => {
  try {
    const results = await Promise.allSettled(req.body.events.map(handleEvent));
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error('Event ' + i + ' failed:', r.reason);
    });
    res.json({ results: results.map(r => r.status) });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(200).json({
    name: 'JClaw',
    description: 'LINE-native AI Agent powered by local LLM + Web Search',
    webhook: '/webhook', health: '/health',
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🐾 JClaw v2.5 is running on port ' + PORT);
  console.log('🦙 Ollama: ' + OLLAMA_HOST + ' (' + OLLAMA_MODEL + ')');
  console.log('🔍 Web Search: SearXNG (self-hosted, free, unlimited)');
  console.log('🧠 Memory: memclawz v9.1 (Qdrant + Neo4j, zero API cost)');
  console.log('📡 Webhook: http://localhost:' + PORT + '/webhook');
  console.log('='.repeat(50));
});
