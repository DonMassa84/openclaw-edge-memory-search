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
