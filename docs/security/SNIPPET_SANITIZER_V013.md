# OpenClaw v0.1.3 — Snippet Sanitizer

Stand: 2026-06-28_005942

## Situation

OpenClaw Edge Memory Search is portfolio-oriented. Previous screenshot review detected local path fragments in snippets.

## Goal SMART

Before creating new screenshots or release artifacts, all visible snippets and API outputs must be sanitized against local path leakage and secret-like strings.

## 6 Components

### 1. Model

Technical repo agent for safe search/API output.

### 2. Tools

- TypeScript sanitizer module
- grep-based leak check
- npm/build checks if available

### 3. Memory

Known context:
- v0.1.1 portfolio-safe API exists.
- v0.1.2 demo docs exist.
- Screenshots were intentionally not pushed because leak check detected local path fragments.
- Next release target: v0.1.3-snippet-sanitizer.

### 4. Audio

Not required.

### 5. Guardrails

- No local absolute paths in snippets.
- No secret-like strings.
- No screenshots before leak check.
- No release before diff review.

### 6. Orchestration

1. Integrate sanitizeSnippet into search/API result generation.
2. Run scripts/check-portfolio-leaks.sh.
3. Run build/test if available.
4. Review git diff.
5. Commit only after clean review.

## Control

```bash
cd "/home/schattenmacher/projects/openclaw-edge-memory-search"
bash scripts/check-portfolio-leaks.sh
npm run build 2>/dev/null || true
git diff --stat
git diff --check
```

## Commit suggestion

```bash
git add src/lib/security/sanitizeSnippet.ts scripts/check-portfolio-leaks.sh docs/security/SNIPPET_SANITIZER_V013.md
git commit -m "feat: add snippet sanitizer for portfolio-safe outputs"
```
