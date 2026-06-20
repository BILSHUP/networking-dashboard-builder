# Migration Guide — Prototype → Real Product (Claude Code)

**Goal:** make this dashboard work for *anyone* from a URL (and as an installable app), not just inside Claude.

## The key idea
Your progress is **already portable** — it lives in this Git repo. "Moving to code" is just: clone this repo and open it in **Claude Code**. Nothing to hand-migrate.

The one real change your goal requires: today the AI tools call `window.cowork.askClaude`, which only exists inside Claude. To make AI work for every visitor, you need a small **backend** that calls the Anthropic API server-side with a secret key.

## Target architecture (matches what you already have)
- **Next.js (App Router, TypeScript) on Vercel** — you're already on Vercel + GitHub, so it deploys with no new infra.
- **One serverless route `/api/ai`** that calls the Anthropic Messages API using `ANTHROPIC_API_KEY` (server-side). The frontend calls `/api/ai` instead of `askClaude`.
- **CSV parsing + connection scoring stay client-side** — preserves privacy: a user's LinkedIn connections never leave their browser; only prompt text hits your API.
- **No database for v1** — keep saving edits in `localStorage`. Add accounts/DB only when you want saved dashboards across devices.
- **PWA** so it installs as an app on phones (cheapest "app" path; native wrapper via Capacitor later).

## Steps
1. Install **Claude Code** (and Git if needed). Clone this repo locally.
2. Open the folder in Claude Code.
3. Paste the **kickoff prompt** below — it scaffolds Next.js and migrates the existing HTML/JS.
4. Create an Anthropic API key → add it as `ANTHROPIC_API_KEY` in **Vercel → Project → Settings → Environment Variables**. (Yours to do — it's a secret.)
5. Push → Vercel auto-deploys the app at your URL. Add a custom domain when ready.

## Kickoff prompt for Claude Code
Paste this into Claude Code, running inside the cloned repo:

```
This repo has a static prototype of a student networking dashboard
(networking-builder.html, networking-dashboard-demo.html, index.html).
Turn it into a deployable Next.js app (App Router, TypeScript) on Vercel
that works for any user from a URL.

Requirements:
1. Migrate the existing UI/CSS/JS. Keep the LinkedIn Connections.csv
   parsing and the connection-scoring logic CLIENT-SIDE — user data must
   never leave the browser except the text sent to the AI.
2. Replace every window.cowork.askClaude(...) call with a fetch to a new
   serverless route /api/ai that calls the Anthropic Messages API using
   process.env.ANTHROPIC_API_KEY. Stream the response if simple.
3. Clean responsive UI; make it installable as a PWA.
4. No database for v1 — persist user edits in localStorage.
5. Must build and deploy on Vercel with no extra config. Add a README
   listing required env vars and run/deploy steps.
First propose the file structure and the plan, then implement it.
```

## What stays your job (by design)
- Installing Claude Code, the Anthropic API key, domain/account setup, and authorizing pushes (GitHub login).

## v2 roadmap (after the above works)
- Accounts + database (Supabase/Postgres) for saved dashboards across devices.
- Live internship feed (jobs API or scheduled scrape of public boards) to replace AI-suggested internships.
- Streaming AI + rate limiting / usage caps on `/api/ai`.
- Native app wrapper (Capacitor) if you want App Store / Play Store presence.

## Reminder
Keep the **real-data** dashboard out of this — it's personal and must stay private (Vercel URLs are public even for private repos). This product is the generic builder only.
