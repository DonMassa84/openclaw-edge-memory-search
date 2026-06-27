
Security Policy
Local-first rule

Private OpenClaw data stays on the user's device.

Forbidden in Git

Never commit:

.env
API keys
tokens
passwords
raw PDFs
raw screenshots
financial files
health files
government/authority correspondence
housing documents
private logs
Runtime boundaries

The app reads from configured local paths only. It should not upload or transmit indexed content.

External APIs

No external AI APIs are used in the MVP.

Hosted playgrounds such as MiniMax, Groq, LM Arena, Google Colab, Kaggle, or HuggingFace Spaces may be used only with synthetic or sanitized examples, never with raw private data.
