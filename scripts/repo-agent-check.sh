#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

CLASS="${REPO_AGENT_CLASS:-GENERIC_REPO_AGENT}"

echo "==== Shadowmaker Repo Agent Check ===="
echo "Repo: $REPO_ROOT"
echo "Class: $CLASS"
echo

fail=0

section() {
  echo
  echo "== $* =="
}

section "Git status"
git status --short || true

section "Tracked runtime folders"
if git ls-files | grep -E '(^|/)(\.venv|node_modules|__pycache__)/'; then
  echo "[FAIL] Runtime/vendor/cache folder appears tracked."
  fail=1
else
  echo "[OK] No tracked .venv/node_modules/__pycache__ folders."
fi

section "Diff hygiene"
git diff --check || fail=1

section "Secret and local path scan"
SCAN_PATTERN='(sk-[A-Za-z0-9_-]{16,}|ghp_[A-Za-z0-9_]{16,}|github_pat_[A-Za-z0-9_]{16,}|xox[baprs]-[A-Za-z0-9-]{16,}|/home/|/mnt/|/media/|C:\\Users|file://)'

if grep -RInE "$SCAN_PATTERN" . \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude-dir=.venv \
  --exclude-dir=.next \
  --exclude-dir=dist \
  --exclude-dir=build \
  --exclude="package-lock.json" \
  --exclude="*.lock" \
  2>/dev/null; then
  echo
  echo "[WARN] Potential secret/path findings above. Manual review required."
  fail=1
else
  echo "[OK] No obvious secrets or local path leaks found."
fi

section "Repo-specific mini-test"

case "$CLASS" in
  P1_OPENCLAW_SNIPPET_SANITIZER)
    if grep -RIn "sanitizeSnippet" src scripts docs 2>/dev/null; then
      echo "[OK] Sanitizer reference found."
    else
      echo "[WARN] No sanitizeSnippet reference found."
      fail=1
    fi
    ;;
  P2_PROOFFLOW_CONFIG_GUARD_INDEX_QUERY)
    if git ls-files | grep -E '(^|/)\.venv/'; then
      echo "[FAIL] .venv is tracked."
      fail=1
    else
      echo "[OK] .venv not tracked."
    fi
    ;;
  P3_PIPELINE_OBSIDIAN_BRIDGE)
    if find . -maxdepth 4 -type f \( -name "*obsidian*" -o -name "*pipeline*" -o -name "*export*" \) | grep .; then
      echo "[OK] Pipeline/Obsidian bridge candidates found."
    else
      echo "[WARN] No bridge/export files found."
    fi
    ;;
  P4_LOCAL_FOCUS_KAIZEN_DASHBOARD)
    if find . -maxdepth 6 -type f \( -iname "*kaizen*" -o -iname "*dashboard*" \) | grep .; then
      echo "[OK] Kaizen/dashboard candidates found."
    else
      echo "[WARN] No Kaizen/dashboard candidates found."
    fi
    ;;
  P5_GOVERNANCE_RELEASE_PROOF)
    if [ -f "AI_GOVERNANCE.md" ] || find . -maxdepth 4 -iname "AI_GOVERNANCE.md" | grep .; then
      echo "[OK] AI_GOVERNANCE.md found."
    else
      echo "[WARN] AI_GOVERNANCE.md missing."
      fail=1
    fi
    ;;
  P6_TALK_WORKFLOW_GH_AUTH)
    if command -v gh >/dev/null 2>&1; then
      gh auth status || {
        echo "[WARN] gh auth not clean. Run: gh auth login"
        fail=1
      }
    else
      echo "[WARN] gh CLI missing."
      fail=1
    fi
    ;;
  *)
    echo "[OK] Generic repo-agent check completed."
    ;;
esac

section "Recommended next command"
echo "git diff --stat"
echo "git status --short"

echo
if [ "$fail" -eq 0 ]; then
  echo "[OK] Repo-Agent Check passed."
else
  echo "[REVIEW] Repo-Agent Check found issues. Do not push/release before review."
fi

exit "$fail"
