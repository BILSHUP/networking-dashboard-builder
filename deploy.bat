@echo off
REM ============================================================
REM  One-command deploy: commits all changes and pushes to GitHub.
REM  Vercel auto-deploys the push in ~30 seconds.
REM
REM  Usage (from inside the repo folder):
REM     deploy.bat "what you changed"
REM  If you omit the message it uses "Update dashboard".
REM ============================================================
setlocal
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Update dashboard"

git add -A
git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo Nothing to commit ^(no changes^) - skipping push.
  goto end
)
git push
echo.
echo ============================================================
echo  Pushed to GitHub. Vercel is deploying now.
echo  Live in ~30s:  https://networking-dashboard-builder.vercel.app
echo ============================================================
:end
endlocal
pause
