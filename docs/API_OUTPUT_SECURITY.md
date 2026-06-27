# API Output Security

## Purpose

OpenClaw Edge Memory Search indexes local OpenClaw memory, reports, docs, prompts, and project artifacts. Because the system works with local-first operational data, public API output must not expose private filesystem structure, raw local paths, or path-derived identifiers.

## Security Decision

The API output is portfolio-safe by default.

The application removes or replaces:

- absolute local filesystem paths
- `/home/<user>/...` references
- raw local source folders
- Base64 IDs derived from local paths
- full text bodies from indexed local files

The API keeps only safe metadata:

- stable result IDs such as `result_001`
- document title
- file name only
- source label such as `OpenClaw Docs`
- modification timestamp
- file size
- short sanitized snippet

## Status API

Endpoint:

```bash
curl -sS http://127.0.0.1:31337/api/status | jq .

Safe behavior:

shows local-first mode
confirms privacy posture
shows configured source labels
confirms whether sources exist
does not expose absolute local paths
Search API

Endpoint:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | jq .

Safe behavior:

returns portfolio-safe output by default
exposes sourceLabel, not raw source
exposes fileName, not absolute path
exposes safe result IDs, not path-derived IDs
Leak Test

Run this before screenshots, demos, commits, and releases:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | grep -q "/home/" \
  && echo "[FAIL] local path leak detected" \
  || echo "[OK] portfolio-safe output"

Expected result:

[OK] portfolio-safe output
Debug Output Policy

Unsafe local debug output must not be enabled by default.

If unsafe debug mode is ever used, it must be:

explicitly opt-in
controlled through an environment variable
disabled for screenshots, public demos, README examples, and portfolio artifacts
documented as local-only
excluded from public examples
Release Reference

v0.1.1-portfolio-safe-api introduced sanitized API output for public portfolio demonstrations.
