#!/usr/bin/env bash
set -Eeuo pipefail

echo "==== SAFE SCAN ===="

if grep -RInE "(ghp_|github_pat_|api[_-]?key|token=|TOKEN=|password=|PASSWORD=|Bearer [A-Za-z0-9]|PRIVATE KEY)" \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=.next \
  . > /tmp/openclaw_edge_secret_scan.txt 2>/dev/null; then
  echo "[WARN] Potential secret-like strings found:"
  cat /tmp/openclaw_edge_secret_scan.txt
  exit 1
else
  echo "[OK] No obvious secrets found in repo files."
fi
