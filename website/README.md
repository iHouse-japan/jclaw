# JClaw Website Prototype

This directory holds the standalone website prototype for JClaw inside the local worktree branch `codex/website-exploration`.

## Why it lives here

- The runtime repository remains focused on the LINE + Ollama self-hosted service.
- The website prototype is intentionally isolated so the product site can evolve without coupling marketing pages to bot runtime code.
- If the direction is approved, this code should move into a dedicated repository such as `jclaw-web`.

## Stack

- Next.js App Router
- React
- `next-intl` for locale-aware routing and translations

## Local development

```bash
cd website
npm install
npm run dev
```

Default routes:

- `/` Japanese
- `/en` English
- `/zh-cn` Simplified Chinese

## Content structure

- `messages/*.json`: short UI labels and repeated copy
- `src/content/site.ts`: structured long-form marketing content for all locales
- `src/app/[locale]/*`: locale-aware pages

## Notes

- Cloud messaging is roadmap-only and must not be presented as shipped functionality.
- Contact is intentionally email-based in the prototype. Do not add a custom backend inside the runtime repo.
- Set `NEXT_PUBLIC_SITE_URL` in deployment so canonical and `hreflang` metadata point to the correct domain.
