#!/usr/bin/env bash
set -Eeuo pipefail

echo "==== OPENCLAW PORTFOLIO LEAK CHECK ===="
echo

PATTERN='(/home/|/mnt/|C:\\Users|Users/|dmassa|Daniel Massa|schattenmacher)'

echo "== Prüfe Repo-Dateien =="
grep -RInE "$PATTERN" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude-dir=.venv \
  --exclude="package-lock.json" \
  || true

echo
echo "== Git Status =="
git status --short || true

echo
echo "Review:"
echo "- Treffer in docs können erlaubt sein, wenn sie bewusst sanitizt/erklärt sind."
echo "- Treffer in API-Beispielen, Screenshots oder Portfolio-Dateien müssen geprüft werden."

