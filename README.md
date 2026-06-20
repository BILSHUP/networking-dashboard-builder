# Networking Dashboard Builder

An AI-powered tool that helps students turn their LinkedIn network into a ranked,
actionable recruiting dashboard — with internship targets, tailored outreach, and
resume help. Works for any visitor from a URL, and installs as an app (PWA).

Built with **Next.js (App Router, TypeScript)** and the **Anthropic API**, deploys
to **Vercel** with no extra config.

## How it works

- **Landing page** (`app/page.tsx`) links to the two apps.
- **The Builder** (`public/networking-builder.html`) — fill out a profile and upload
  your own LinkedIn **Connections.csv**. CSV parsing and connection scoring run
  **entirely in your browser**; only the prompt text you generate for an AI tool is
  ever sent to the server. Your edits persist in `localStorage`.
- **The Demo** (`public/networking-dashboard-demo.html`) — the full dashboard on
  fabricated sample data.
- **`/api/ai`** (`app/api/ai/route.ts`) — a serverless route that calls the Anthropic
  Messages API server-side using your secret `ANTHROPIC_API_KEY`. The browser never
  sees the key. This replaces the old in-Claude `window.cowork.askClaude` calls.

### Privacy
A user's LinkedIn connections never leave their browser. The CSV is parsed and scored
client-side; the only thing that hits `/api/ai` is the prompt text for a given AI tool
(which the user can see — it's also offered as copy-paste fallback).

## Required environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | **Yes** | Your Anthropic API key (server-side secret). Create one at <https://console.anthropic.com/settings/keys>. |
| `ANTHROPIC_MODEL` | No | Which Claude model `/api/ai` uses. Defaults to `claude-opus-4-8`. Cheaper options: `claude-sonnet-4-6`, `claude-haiku-4-5`. |

Copy `.env.local.example` to `.env.local` for local dev. **Never commit `.env.local`** —
it's gitignored.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then put your real ANTHROPIC_API_KEY in it
npm run dev                         # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (also regenerates PWA icons)
npm run start      # serve the production build
npm run gen-icons  # regenerate public/icon-192.png and icon-512.png from the SVG
```

## Deploy to Vercel

1. Push this repo to GitHub (Vercel auto-builds on every push to `main`).
2. In **Vercel → Project → Settings → Environment Variables**, add `ANTHROPIC_API_KEY`
   (and optionally `ANTHROPIC_MODEL`) for the Production (and Preview) environments.
3. Vercel detects Next.js automatically — no build settings to change.
4. Redeploy (or push) so the new env var is picked up.

The included `deploy.bat` / `deploy.sh` are convenience wrappers for
`git add -A && git commit && git push`.

## PWA / install as an app

`public/manifest.webmanifest` + `public/sw.js` make the app installable. On desktop
Chrome/Edge and Android, users get an **Install** option. Icons are generated at build
time by `scripts/generate-icons.mjs` (zero dependencies). For an App Store / Play Store
presence later, wrap it with Capacitor.

## Roadmap (v2)

- Accounts + database (Supabase/Postgres) for saved dashboards across devices.
- Live internship feed (jobs API or scheduled scrape) to replace AI-suggested internships.
- Streaming AI responses + rate limiting / usage caps on `/api/ai`.
- Native app wrapper (Capacitor).

## Status
Migrated from a static prototype. The demo uses fabricated data for illustration only.
