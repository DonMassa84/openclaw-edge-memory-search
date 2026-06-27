
Portfolio Demo
Project

OpenClaw Edge Memory Search is a local-first Next.js prototype for searching OpenClaw memory, reports, docs, prompts, and project artifacts without external API calls.

Problem

Local AI and agent systems produce many operational artifacts:

memory notes
reports
project briefs
prompts
status logs
governance documents
automation outputs

Without a searchable local interface, this knowledge becomes fragmented.

The second problem is security: a public demo must not expose local filesystem paths, private workspace structure, tokens, archives, or raw personal data.

Goal

Build a local-first search interface that demonstrates operational visibility while keeping private local data structure out of public API output.

Architecture
Local OpenClaw Workspace
        |
        v
Scanner
        |
        v
Search API
        |
        |-- Safe result ID
        |-- Title
        |-- File name only
        |-- Source label
        |-- Modified timestamp
        |-- Size
        |-- Sanitized snippet
        |
        v
Next.js UI / Portfolio Demo
Components
Component	Role
Next.js App Router	Local web interface and API routes
Scanner	Reads local Markdown/text artifacts
/api/status	Shows system and source health
/api/search	Searches local OpenClaw artifacts
Sanitizer	Removes raw paths and unsafe IDs from public output
Docs	Explains reproducibility, security posture, and demo flow
Local Demo Flow

Start the development server:

npm run dev

Open:

http://127.0.0.1:31337

Check status:

curl -sS http://127.0.0.1:31337/api/status | jq .

Run search:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | jq '.privacy, .results[0]'

Expected privacy mode:

"portfolio-safe-output"
Public Demo Safety

Before recording a demo or taking screenshots:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | grep -q "/home/" \
  && echo "[FAIL] local path leak detected" \
  || echo "[OK] portfolio-safe output"

Only use screenshots after the output confirms:

[OK] portfolio-safe output
Screenshot Checklist

Recommended screenshots:

Home dashboard
Status API output
Search API output with portfolio-safe-output
Search UI with source labels
GitHub release page for v0.1.1-portfolio-safe-api

Do not include screenshots that show:

/home/<user>/...
private email/archive folders
raw OpenClaw memory content containing sensitive information
tokens, credentials, .env values, or private authorities/finance/health data
Demo Narrative

Use this sequence in interviews or portfolio walkthroughs:

The system solves local knowledge fragmentation in an AI operations workspace.
It runs locally and does not call external APIs.
It indexes operational artifacts from the OpenClaw workspace.
The status endpoint shows source availability without leaking local paths.
The search endpoint returns sanitized, portfolio-safe metadata.
The v0.1.1 release demonstrates security maturity beyond a simple prototype.
Release Milestones
Version	Meaning
v0.1.0-edge-memory-search	Initial local-first prototype
v0.1.1-portfolio-safe-api	Sanitized API output for public demos
Positioning

This project demonstrates:

IT operations automation
local-first AI tooling
API design
privacy-aware engineering
AI governance thinking
reproducible portfolio delivery
