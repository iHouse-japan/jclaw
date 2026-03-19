# 🐾 JClaw v2.2 — LINE AI Agent with Google Workspace

<div align="center">

**Japan's first LINE-native AI Agent with Tier S memory + Google Workspace.**

🧠 Knowledge Graph | 🔍 Web Search | 📧 Gmail+Calendar+Tasks+Drive | 💰 Zero API Cost

[Website](https://jclaw.1d1s.com) · [Web Chat](https://chat.1d1s.com) · [龙虾大全](https://longxia.1d1s.com) · [ROBO COMPARE](https://1d1s.com/robo/)

**LINE Target Markets: 🇯🇵 Japan · 🇹🇭 Thailand · 🇹🇼 Taiwan · 🇮🇩 Indonesia**

</div>

## What's New in v2.2

- 📧 **Google Workspace Integration** — Gmail, Calendar, Tasks, Drive via googleapis
  - Auto-detect keywords: "メール" "calendar" "タスク" "ドライブ" triggers API
  - User configures own Google OAuth credentials in `.env`
- 🔒 **Owner-Only Mode** — `/setowner` locks bot to your LINE account
- 🌐 **Web Chat PWA** — `chat.1d1s.com`, no LINE message limits
- 👤 **Per-user Memory Isolation** — Each user's memories are separate

## Features

| Category | Feature | Details |
|----------|---------|---------|
| 🧠 Memory | Tier S (memclawz v9.1) | Qdrant vector + Neo4j graph, 2.7x Mem0 |
| 🔍 Search | SearXNG | Google/Bing/DuckDuckGo, free & unlimited |
| 📧 Google | Gmail | Read inbox, search, auto-detect "メール" |
| 📅 Google | Calendar | List events, auto-detect "予定" |
| ✅ Google | Tasks | List todos, auto-detect "タスク" |
| 📁 Google | Drive | Search files, auto-detect "ドライブ" |
| 🦙 LLM | Ollama | qwen3:14b or any model, zero API cost |
| 🌏 Language | Trilingual | JP/EN/ZH auto-detection |
| 🔒 Security | Owner Mode | Lock bot to single LINE user |
| 👤 Privacy | Per-user Memory | Isolated memory per LINE userId |

## Architecture

```
LINE/Web User → VPS (Node.js)
                 ├── SSH Tunnel → Ollama (LLM)
                 ├── SSH Tunnel → SearXNG (search)
                 ├── SSH Tunnel → memclawz (memory)
                 │                 ├── Qdrant (vector)
                 │                 └── Neo4j (graph)
                 └── googleapis → Gmail/Calendar/Tasks/Drive
```

## Commands

| Command | Description |
|---------|-------------|
| `/search <query>` | Web search (EN) |
| `/検索 <keyword>` | Web search (JA) |
| `/搜索 <keyword>` | Web search (ZH) |
| `/reset` | Reset conversation |
| `/status` | System status + links |
| `/help` | Show help |
| `/whoami` | Show LINE userId |
| `/setowner` | Set yourself as owner |

## Quick Start

```bash
git clone https://github.com/iHouse-japan/jclaw.git
cd jclaw && npm install && cp .env.example .env
# Edit .env with LINE credentials + optional Google OAuth
ollama pull qwen3:14b && npm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `LINE_CHANNEL_SECRET` | ✅ | LINE Messaging API |
| `LINE_CHANNEL_ACCESS_TOKEN` | ✅ | LINE Messaging API |
| `OLLAMA_HOST` | | Default: `http://localhost:11434` |
| `OLLAMA_MODEL` | | Default: `qwen3:14b` |
| `SEARXNG_URL` | | Default: `http://localhost:8899` |
| `MEMCLAWZ_URL` | | Default: `http://localhost:3500` |
| `OWNER_ONLY` | | `true` to restrict access |
| `OWNER_USER_ID` | | Owner's LINE userId |
| `GOOGLE_CLIENT_ID` | | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | | Google OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | | Google OAuth refresh token |

## Comparison

| Agent | Memory | Search | Google WS | Graph | Cost |
|-------|--------|--------|-----------|-------|------|
| **JClaw v2.2** | ✅ Tier S | ✅ SearXNG | ✅ Full | ✅ Neo4j | $0 |
| OpenClaw | ✅ | Plugin | Plugin | ❌ | API fees |
| Mem0 | ✅ | ❌ | ❌ | $249/m | $19-249/m |
| ChatGPT | ✅ | ✅ | Plugin | ❌ | $20/m |
| Dify | ❌ | Plugin | Plugin | ❌ | Plugin |

## Links

- 🌐 [jclaw.1d1s.com](https://jclaw.1d1s.com) — Official website
- 💬 [chat.1d1s.com](https://chat.1d1s.com) — Web chat (PWA)
- 🦞 [longxia.1d1s.com](https://longxia.1d1s.com) — 龙虾大全
- 🤖 [1d1s.com/robo/](https://1d1s.com/robo/) — ROBO COMPARE

## License

MIT — Built by [iHouse Japan](https://github.com/iHouse-japan) 🇯🇵 Osaka
