# 🐾 JClaw v2.5

**LINE-native AI Agent powered by local LLM**

Your own AI assistant running entirely on your hardware. Connects to LINE, searches the web, reads your Gmail, and remembers your conversations — all without sending data to any cloud AI service.

## What it does

- 💬 Chat via LINE with a local LLM (Ollama)
- 🔍 Web search via self-hosted SearXNG (free, unlimited)
- 🧠 Long-term memory via memclawz (Qdrant + Neo4j)
- 📧 Gmail / Calendar / Drive / Tasks integration
- 🌐 Browser access via Playwright
- 🫁 Proactive notifications (weather alerts, train delays)
- 🛡️ Owner-only mode, rate limiting, webhook signature verification

## Quick start (minimum viable deployment)

**You need:** Node.js 20+, Ollama, a LINE developer account.

```bash
# 1. Clone
git clone https://github.com/iHouse-japan/jclaw.git
cd jclaw

# 2. Install
npm install
mkdir -p logs

# 3. Configure
cp .env.example .env
# Edit .env — fill in LINE_CHANNEL_SECRET and LINE_CHANNEL_ACCESS_TOKEN

# 4. Pull a model
ollama pull qwen3:14b
# Minimum RAM: 16GB for 14b, 8GB for 7b models
# If your machine has less RAM: ollama pull qwen3:8b
# Then set OLLAMA_MODEL=qwen3:8b in .env

# 5. Start
node server.js
# Or with PM2:
pm2 start ecosystem.config.cjs
```

**At this point JClaw is running locally.** To connect it to LINE, you need a public HTTPS URL for the webhook (see LINE setup below).

## LINE setup

1. Go to [LINE Developers Console](https://developers.line.biz/console/)
2. Create a new **Messaging API channel**
3. Copy **Channel Secret** → paste into `.env` as `LINE_CHANNEL_SECRET`
4. Issue a **Channel Access Token** → paste into `.env` as `LINE_CHANNEL_ACCESS_TOKEN`
5. Set **Webhook URL** to your public HTTPS endpoint:
   - If you have a server with domain: `https://yourdomain.com/webhook`
   - For local testing: use [ngrok](https://ngrok.com/) → `ngrok http 3001` → copy the HTTPS URL
6. Enable **Use webhook** in the LINE console
7. Disable **Auto-reply messages** in the LINE Official Account settings

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LINE_CHANNEL_SECRET` | **Yes** | — | LINE Messaging API channel secret |
| `LINE_CHANNEL_ACCESS_TOKEN` | **Yes** | — | LINE Messaging API access token |
| `OLLAMA_HOST` | No | `http://localhost:11434` | Ollama API endpoint |
| `OLLAMA_MODEL` | No | `qwen3:14b` | Model to use (any Ollama model) |
| `PORT` | No | `3001` | HTTP server port |
| `SEARXNG_URL` | No | — | SearXNG endpoint (enables web search) |
| `MEMCLAWZ_URL` | No | — | memclawz endpoint (enables memory) |
| `OWNER_ONLY` | No | `false` | Restrict to single user |
| `OWNER_USER_ID` | No | — | LINE userId of the owner |
| `GOOGLE_CLIENT_ID` | No | — | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | — | Google OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | No | — | Google OAuth refresh token |
| `SYSTEM_PROMPT` | No | (built-in) | Custom system prompt |

## Dependency levels

```
┌─────────────────────────────────────────────────┐
│ REQUIRED (JClaw won't start without these)      │
│  • Node.js 20+                                  │
│  • LINE Channel Secret + Access Token           │
│  • Ollama with a pulled model                   │
├─────────────────────────────────────────────────┤
│ RECOMMENDED (JClaw works without, but limited)  │
│  • SearXNG — enables web search                 │
│  • Public HTTPS URL — needed for LINE webhook   │
├─────────────────────────────────────────────────┤
│ OPTIONAL (extra capabilities)                   │
│  • memclawz — long-term memory                  │
│  • Google OAuth — Gmail/Calendar/Drive/Tasks    │
│  • Playwright — browser access                  │
│  • Docker — for SearXNG, Qdrant, Neo4j          │
└─────────────────────────────────────────────────┘
```

## Advanced features

### Web search (SearXNG)

```bash
docker run -d --name searxng -p 8899:8080 searxng/searxng
# Add to .env: SEARXNG_URL=http://localhost:8899
```

### Memory system (memclawz)

Requires Qdrant + Neo4j. See [memclawz documentation](https://github.com/yoniassia/memclawz).

```bash
# Add to .env: MEMCLAWZ_URL=http://localhost:3500
```

### Google Workspace

1. Create an OAuth client at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Enable Gmail, Calendar, Tasks, Drive APIs
3. Get a refresh token via the OAuth flow
4. Add credentials to `.env`

### Owner mode

Restrict the bot so only you can use it:

```bash
# In .env:
OWNER_ONLY=true
# Then send /setowner in LINE to register your userId
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Missing required environment variables` at startup | `.env` not configured | `cp .env.example .env` and fill in LINE credentials |
| `Ollama not reachable` warning | Ollama not running | `ollama serve` or check OLLAMA_HOST in .env |
| `Model "xxx" not found` warning | Model not pulled | `ollama pull qwen3:14b` (or your chosen model) |
| LINE messages not received | Webhook URL wrong or not HTTPS | Check LINE console webhook settings, use ngrok for local dev |
| `EACCES` on PM2 logs | Log directory needs permission | Default logs go to `./logs/` — run `mkdir -p logs` |
| Google features not working | Missing OAuth credentials | Set GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN in .env |
| Search not working | SearXNG not running | Start SearXNG container or remove SEARXNG_URL from .env |
| Memory not working | memclawz not running | Start memclawz or remove MEMCLAWZ_URL from .env |

## Hardware requirements

| Setup | RAM | Storage | GPU |
|-------|-----|---------|-----|
| Minimum (7-8B model) | 8GB | 10GB | Not required |
| Recommended (14B model) | 16GB | 20GB | Not required |
| Full (72B model) | 64GB+ | 50GB | Recommended |

Ollama uses CPU by default. GPU acceleration is automatic if detected (NVIDIA CUDA, Apple Metal).

## Architecture

```
LINE App → LINE Platform → Webhook → JClaw (Node.js)
                                        ├── Ollama (local LLM)
                                        ├── SearXNG (web search)
                                        ├── memclawz (memory)
                                        └── Google APIs (Gmail, Calendar, Drive, Tasks)
```

## License

MIT — © iHouse Japan 2026

## Links

- Web chat: [chat.1d1s.com](https://chat.1d1s.com)
- Product page: [jclaw.1d1s.com](https://jclaw.1d1s.com)
- GitHub: [github.com/iHouse-japan/jclaw](https://github.com/iHouse-japan/jclaw)
