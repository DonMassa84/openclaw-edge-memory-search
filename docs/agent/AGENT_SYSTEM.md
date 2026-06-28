# Repo Agent System

Stand: 2026-06-28_010340

Repo:
```text
/home/schattenmacher/projects/openclaw-edge-memory-search
```

Class:
```text
P1_OPENCLAW_SNIPPET_SANITIZER
```

## 1. Situation

This repo is now managed by the Shadowmaker Repo-Agent Standard.

## 2. Goal SMART

Sanitize snippets, API/search outputs and portfolio screenshots against local path/secret leakage.

Every change must be small, reviewable, documented and safe for local/portfolio use.

## 3. Stakeholders

- Operator: Daniel / Schattenmacher
- Repo-Agent: local check and documentation layer
- Git: version control only
- GitHub / Portfolio: only after sanitizing and Human Review

## 4. Causes

### Human
Multiple repos create context switching and operational drift.

### Organization
Tasks are distributed across chats, reports and local folders.

### Process
Without a standard, every repo is handled differently.

## 5. Alternatives

### A — Manual review only
Too slow.

### B — One-off repo scripts
Useful but inconsistent.

### C — Standardized Repo-Agent
Chosen.

## 6. Evaluation

### Economic
Reduces repeated manual setup.

### Human
Lowers cognitive load.

### Organizational
Creates one shared pattern across all repos.

## 7. Decision + Justification

Decision:
Use the 6-component agent model for every repo.

Justification:
The repo is an operational artifact, not just a folder. It needs memory, guardrails, mini-tests and review checkpoints.

## 8. Implementation

### Model
Technical repo-agent.

### Tools
- git
- bash
- grep
- repo-local scripts
- optional: gh CLI

### Memory
Use repo docs, status, release history and known project context.

### Audio
Only used if audio/video/transcripts are explicitly part of the repo workflow.

### Guardrails
- No secrets
- No tokens
- No local private paths in public output
- No raw private data
- No push without review
- No release without release-proof
- No screenshots before leak check

### Orchestration
1. Status prüfen
2. Aufgabe isolieren
3. Mini-Test definieren
4. Änderung klein halten
5. Check ausführen
6. Diff prüfen
7. Human Review
8. Commit
9. Optional Push/Release

## 9. Control

Run:

```bash
bash scripts/repo-agent-check.sh
bash scripts/repo-agent-snapshot.sh
git diff --stat
git diff --check
git status --short
```

## 10. Sustainability & Communication

Every future repo task must be written in this structure:

```text
Situation
Goal SMART
Stakeholders
Causes
Alternatives
Evaluation
Decision
Implementation
Control
Sustainability & Communication
```
