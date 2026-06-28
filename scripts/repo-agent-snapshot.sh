#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

TS="$(date +%Y-%m-%d_%H%M%S)"
OUT="docs/agent/snapshots"
mkdir -p "$OUT"

SNAP="$OUT/REPO_SNAPSHOT_$TS.md"

cat > "$SNAP" <<SNAPEOF
# Repo Snapshot

Stand: $TS

Repo:
\`\`\`text
$REPO_ROOT
\`\`\`

## Git status

\`\`\`text
$(git status --short || true)
\`\`\`

## Last commits

\`\`\`text
$(git log --oneline -5 2>/dev/null || true)
\`\`\`

## Diff stat

\`\`\`text
$(git diff --stat || true)
\`\`\`

## Agent Check

Run manually:

\`\`\`bash
bash scripts/repo-agent-check.sh
\`\`\`

SNAPEOF

echo "[OK] Snapshot written: $SNAP"
