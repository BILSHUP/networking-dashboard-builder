#!/usr/bin/env bash
# ============================================================
#  One-command deploy: commits all changes and pushes to GitHub.
#  Vercel auto-deploys the push in ~30 seconds.
#
#  Usage (from inside the repo folder):
#     ./deploy.sh "what you changed"
#  If you omit the message it uses "Update dashboard".
# ============================================================
set -e
MSG="${1:-Update dashboard}"

git add -A
if git diff --cached --quiet; then
  echo "Nothing to commit (no changes) - skipping push."
  exit 0
fi
git commit -m "$MSG"
git push
echo ""
echo "============================================================"
echo " Pushed to GitHub. Vercel is deploying now."
echo " Live in ~30s:  https://networking-dashboard-builder.vercel.app"
echo "============================================================"
