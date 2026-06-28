#!/usr/bin/env bash
set -Eeuo pipefail

echo "==== RELEASE CHECK ===="
bash scripts/doctor.sh
bash scripts/smoke-test.sh
bash scripts/security-scan.sh
bash scripts/agent-doctor.sh

echo
echo "== Git status =="
git status --short || true

echo "[DONE] Release check complete."
