#!/usr/bin/env bash
set -Eeuo pipefail

echo "==== OPENCLAW EDGE MEMORY SEARCH DOCTOR ===="
date
echo

echo "== Node =="
node --version || true
npm --version || true

echo
echo "== OpenClaw Gateway =="
systemctl --user status openclaw-gateway.service --no-pager --lines=12 2>/dev/null || true

echo
echo "== Ports =="
ss -ltnp | grep -E '18789|18791|31337' || true

echo
echo "== Sources =="
for p in \
  "$HOME/.openclaw/workspace" \
  "$HOME/.openclaw/workspace/reports" \
  "$HOME/.openclaw/workspace/memory" \
  "$HOME/.openclaw/workspace/docs" \
  "$HOME/.openclaw/workspace/projects" \
  "$HOME/shadowmaker_control_center/agent_md"
do
  if [[ -e "$p" ]]; then
    echo "[OK] $p"
  else
    echo "[FEHLT] $p"
  fi
done

echo
echo "== Secret scan repo =="
bash scripts/safe-scan.sh || true
