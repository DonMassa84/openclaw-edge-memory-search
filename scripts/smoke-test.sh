#!/usr/bin/env bash
set -Eeuo pipefail

echo "==== SMOKE TEST ===="
git rev-parse --is-inside-work-tree >/dev/null
echo "[OK] Git repo detected"

if [ -f package.json ]; then
  echo "[INFO] Node project"
  node --version || true
  npm --version || true
fi

if [ -f requirements.txt ] || [ -f pyproject.toml ] || [ -f main.py ]; then
  echo "[INFO] Python project"
  python3 --version
fi

while IFS= read -r f; do
  bash -n "$f"
  echo "[OK] syntax: $f"
done < <(find scripts -maxdepth 1 -type f -name "*.sh" 2>/dev/null | sort)

echo "[DONE] Smoke test finished."
