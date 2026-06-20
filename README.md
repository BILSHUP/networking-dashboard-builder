# Networking Dashboard Builder

An AI-powered tool that helps students turn their LinkedIn network into a ranked, actionable recruiting dashboard — with internship targets, tailored outreach, and resume help.

## Live files

### `networking-builder.html` — the product
Fill out a profile (school, year, major, target fields, dream companies, resume) and upload your own LinkedIn **Connections.csv** export. It runs entirely in your browser and generates a personalized dashboard:
- **Ranked network** — every connection scored by title seniority × your chosen target fields (interns & peers weighted up, since they can tell you how they landed a role and refer you in).
- **AI tools** — message composer, resume tailor, and internship suggestions.
- **Compliant by design** — uses each user's *own* LinkedIn data export (Settings → Data Privacy → Get a copy of your data → Connections). No scraping; nothing leaves the browser.

### `networking-dashboard-demo.html` — feature demo
A fully-populated example dashboard running on **sample/synthetic data** (no real people). Shows the end state the builder produces: Overview, People, Internships (collapsible by category), Applications pipeline, ranked My Network, Resume Tailor, AI Coach, and strategy.

## How to use
Open either file in any modern browser. AI features use on-device inference when run inside Claude; otherwise they hand you a copy-paste prompt.

## Roadmap (prototype → product)
- Accounts + database (replace browser localStorage)
- Live internship feed (replace AI-suggested list)
- Hosted AI API so tools run anywhere
- Team / cohort sharing

## Status
Prototype. The demo uses fabricated data for illustration only.
