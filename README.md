# OpenClaw Edge Memory Search

Local-first browser search for OpenClaw memory, reports, docs, projects, and Agent-MD files.

## Purpose

This project adds an on-device / edge layer to OpenClaw Mission Control:

- search `MEMORY.md`, daily memory, reports, docs, projects
- inspect OpenClaw status
- keep private data local
- avoid external APIs
- create a reproducible portfolio-ready proof of local AI operations

## Why this exists

OpenClaw produces many files: memory, reports, docs, screenshots, project notes, governance notes, and operational logs. Without a local search layer, Daniel loses control over what exists and what matters today.

This app creates a private browser interface for local memory and report discovery.

## Tech Stack

- Next.js App Router
- TypeScript
- Local filesystem API routes
- No external AI API
- Runs on `127.0.0.1:31337`

## Quickstart

```bash
git clone <repo-url>
cd openclaw-edge-memory-search
npm install
npm run doctor
npm run dev
Open:

http://127.0.0.1:31337
Data Sources

Default local sources:

~/.openclaw/workspace
~/.openclaw/workspace/reports
~/.openclaw/workspace/memory
~/.openclaw/workspace/docs
~/.openclaw/workspace/projects
~/shadowmaker_control_center/agent_md
Privacy Rules

This repo must never contain private OpenClaw data.

Do not commit:

.env
secrets
tokens
raw PDFs
screenshots
private reports
Jobcenter data
financial data
health data
housing data
raw government correspondence
Portfolio Sentence

Built a local-first OpenClaw Edge Memory Search app that indexes private agent memory, reports, docs, and project files directly from the local filesystem, exposing a browser-based Mission Control search surface without sending private data to external APIs.



<!-- OPENCLAW_PORTFOLIO_DEMO_START -->
Portfolio Demo

OpenClaw Edge Memory Search is a local-first Next.js prototype for searching OpenClaw memory, reports, docs, prompts, and project artifacts without external API calls.

The project demonstrates a practical IT Operations and AI Governance pattern:

local operational artifacts
        |
        v
local scanner
        |
        v
portfolio-safe API
        |
        v
dashboard / demo / documentation
Problem

Local AI and agent workflows generate many useful artifacts: memory notes, reports, prompts, project briefs, governance documents, and automation outputs. Without a searchable local interface, that information becomes fragmented.

The second problem is security: a public demo must not expose local filesystem paths, private workspace structure, tokens, archives, or raw personal data.

Security Decision

The API is portfolio-safe by default.

Public API output removes or replaces:

absolute local filesystem paths
/home/<user>/... references
raw source folders
Base64 IDs derived from local paths
full local file bodies

The API keeps only:

safe result IDs
document titles
file names
source labels
timestamps
file size
short sanitized snippets
API Demo

Start the local server:

npm run dev

Status check:

curl -sS http://127.0.0.1:31337/api/status | jq .

Search check:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | jq '.privacy, .results[0]'

Expected safe search output:

{
  "privacy": "portfolio-safe-output",
  "result": {
    "id": "result_001",
    "title": "OpenClaw Browser / Hosted Playgrounds Policy — Schattenmacher Edition",
    "fileName": "OPENCLAW_BROWSER_HOSTED_PLAYGROUNDS_POLICY_20260627_173354.md",
    "sourceLabel": "OpenClaw Docs",
    "modified": "2026-06-27T15:33:54.260Z",
    "size": 7766,
    "snippet": "# OpenClaw Browser / Hosted Playgrounds Policy — Schattenmacher Edition ..."
  }
}

Leak test before screenshots or demos:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | grep -q "/home/" \
  && echo "[FAIL] local path leak detected" \
  || echo "[OK] portfolio-safe output"
Screenshots

Recommended screenshot files:

docs/screenshots/01-home-dashboard.png
docs/screenshots/02-status-api-safe-output.png
docs/screenshots/03-search-api-portfolio-safe-output.png
docs/screenshots/04-search-ui-results.png
docs/screenshots/05-github-release-v0.1.1.png

Screenshot rules are documented in docs/SCREENSHOTS.md.

Documentation
Document	Purpose
docs/PORTFOLIO_DEMO.md	Demo flow, architecture, positioning
docs/API_OUTPUT_SECURITY.md	API sanitization and security decisions
docs/SCREENSHOTS.md	Safe screenshot workflow
docs/demo/status.safe.example.json	Safe status API example
docs/demo/search.safe.example.json	Safe search API example
Release Milestones
Version	Meaning
v0.1.0-edge-memory-search	Initial local-first prototype
v0.1.1-portfolio-safe-api	Sanitized API output for public demos
Portfolio Positioning

This repository demonstrates:

local-first AI operations tooling
Next.js API routes
local workspace search
privacy-aware API design
AI governance documentation
reproducible GitHub release workflow
<!-- OPENCLAW_PORTFOLIO_DEMO_END -->

