# Update & Deploy Guide

Vercel already auto-deploys this repo on every push to `main`. So updating the live site = **getting your change into GitHub.** Set up the one-time clone below, then every future update is a single step.

---

## One-time setup (≈5 minutes)

### Easiest: GitHub Desktop (recommended)
1. Install **GitHub Desktop**: https://desktop.github.com → sign in with your GitHub account (this handles auth once, no tokens).
2. **File → Clone repository →** pick `BILSHUP/networking-dashboard-builder` → choose a local folder (e.g. `C:\Users\bisho\Claude\Projects\Networking\networking-dashboard-builder`).
3. Done. That folder is now your working copy.

### Power option: Git CLI
1. Install Git: https://git-scm.com  and GitHub CLI: https://cli.github.com
2. Authenticate once: `gh auth login`
3. Clone:
   ```
   cd C:\Users\bisho\Claude\Projects\Networking
   git clone https://github.com/BILSHUP/networking-dashboard-builder.git
   ```

---

## The everyday workflow

1. **Make a change** to a file in that folder (`index.html`, `networking-builder.html`, `networking-dashboard-demo.html`). Either edit it yourself, or ask Claude/Cowork to save an updated version into that folder.
2. **Push it:**
   - **GitHub Desktop:** you'll see the changed files → type a summary → **Commit to main** → **Push origin.** (two clicks)
   - **CLI / double-click:** run the included **`deploy.bat`** (Windows) — double-click it, or from a terminal:
     ```
     deploy.bat "made the header bigger"
     ```
     (Mac/Linux/Git-Bash: `./deploy.sh "made the header bigger"`)
3. **Wait ~30 seconds.** Vercel rebuilds automatically. Refresh:
   - https://networking-dashboard-builder.vercel.app

That's the whole loop: **edit → commit/push (one step) → live.**

---

## How Claude/Cowork fits in
When you ask Claude to change the dashboard, have it **save the updated file directly into your cloned folder** (give it the path). Then you just run the push step above. No more manual web uploads.

## Notes
- **Don't deploy the private real-data dashboard.** Keep `networking-dashboard-suite` undeployed/deleted on Vercel — Vercel URLs are public even for private repos, which would expose your 602 real contacts.
- Vercel keeps every deployment, so you can roll back from the Vercel dashboard → Deployments → "Promote to Production" on an older one if a change breaks something.
- No build step is needed — these are static HTML files, so deploys are near-instant.
