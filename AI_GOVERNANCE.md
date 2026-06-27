
AI Governance — OpenClaw Edge Memory Search
Purpose

Provide a local, auditable memory and report search layer for OpenClaw without sending private data to external APIs.

Architecture
Next.js UI on localhost
Server-side filesystem scanning
Local Markdown/TXT/JSON indexing
No cloud AI calls
No remote telemetry
Risk Controls
local-only by default
secret-like file exclusions
.env ignored
no private data committed
explicit source paths
no external model providers in MVP
Human Review

Search results are read-only. The user decides what to act on.

Provider Policy

Local Ollama/OpenClaw remains the standard for private workflows.

MiniMax, Groq, LM Arena, Colab, Kaggle, and HuggingFace Spaces are classified as hosted playgrounds and are allowed only for sanitized demos, learning, and model comparison.

Secret Rules

No tokens. No API keys. No private raw documents. No secrets in Git.
