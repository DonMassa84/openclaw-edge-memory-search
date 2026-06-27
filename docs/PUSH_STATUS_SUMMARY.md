# OpenClaw Edge Memory Search — Push Status Summary

## Purpose

This document records what was pushed to GitHub, what was intentionally not pushed, and what remains as the next technical step.

## Current Repository Status

The repository contains a documented portfolio-safe baseline for OpenClaw Edge Memory Search.

The current safe baseline includes:

- local-first search prototype
- portfolio-safe API output
- API output security documentation
- portfolio demo documentation
- screenshot security gate documentation
- final project status documentation

## Pushed to GitHub

The following documentation is part of the pushed repository state:

| File | Status | Purpose |
|---|---|---|
| `README.md` | pushed | project overview and documentation links |
| `docs/API_OUTPUT_SECURITY.md` | pushed | API output sanitization decisions |
| `docs/PORTFOLIO_DEMO.md` | pushed | portfolio demo flow |
| `docs/SCREENSHOTS.md` | pushed | safe screenshot workflow |
| `docs/SCREENSHOT_SECURITY_GATE.md` | pushed | fail-closed screenshot security rule |
| `docs/PORTFOLIO_RELEASE_STATUS.md` | pushed | release and portfolio baseline status |
| `docs/FINAL_PROJECT_STATUS.md` | pushed | final current project status |
| `docs/demo/status.safe.example.json` | pushed | safe status API example |
| `docs/demo/search.safe.example.json` | pushed | safe search API example |

## Published Release Chain

| Version | Status | Meaning |
|---|---|---|
| `v0.1.0-edge-memory-search` | published | initial local-first prototype |
| `v0.1.1-portfolio-safe-api` | published | portfolio-safe API output |
| `v0.1.2-demo-docs` | published | portfolio demo and API security documentation |

## Post-Release Documentation

After `v0.1.2-demo-docs`, additional documentation was pushed to explain why screenshots are currently blocked.

This includes:

- screenshot security gate
- final project status
- push status summary

## Intentionally Not Pushed

The following items are intentionally not part of the public repository state:

| Item | Reason |
|---|---|
| Screenshot PNG files | blocked until snippets are sanitized |
| Screenshot HTML exports | runtime artifact, not safe for portfolio |
| Browser-generated temporary files | runtime artifact |
| framework-generated local type changes | not relevant to portfolio documentation |
| private local memory files | must remain local |
| raw reports or private archives | must not be published |
| secrets, tokens, credentials | must never be committed |

## Screenshot Decision

Screenshots are intentionally deferred.

Reason:

```text
The screenshot workflow detected a home-path leak and stopped.

This is the correct fail-closed security behavior.

Current Safe Public State

The repository is safe as a documented portfolio prototype without screenshots.

Safe public claims:

local-first memory search prototype
no external API dependency for the demo path
portfolio-safe API fields
sanitized result IDs
source labels instead of raw local paths
screenshot gate blocks unsafe visual artifacts
Not Yet Done

The following is not yet implemented:

Item	Status
snippet sanitizer release	not done
public screenshots	deferred
screenshot gallery	deferred
release v0.1.3-snippet-sanitizer	not created
UI screenshot proof	deferred
Next Technical Step

Recommended next release:

v0.1.3-snippet-sanitizer

Scope:

sanitize UI-visible snippets
prevent home-path fragments in search result snippets
add a regression leak test
rerun screenshot workflow
commit only verified safe screenshots
publish release notes
Final Rule

Do not commit screenshots until the snippet sanitizer proves that UI-visible output cannot leak private local path fragments.
