
Screenshots
Purpose

Screenshots should prove that the project works without exposing private local data.

Screenshot Targets

Create images manually and store them in:

docs/screenshots/

Recommended file names:

01-home-dashboard.png
02-status-api-safe-output.png
03-search-api-portfolio-safe-output.png
04-search-ui-results.png
05-github-release-v0.1.1.png
Before Taking Screenshots

Run:

curl -sS "http://127.0.0.1:31337/api/search?q=openclaw" | grep -q "/home/" \
  && echo "[FAIL] local path leak detected" \
  || echo "[OK] portfolio-safe output"

Only proceed if the result is:

[OK] portfolio-safe output
Safe Screenshot Rules

Allowed:

local dashboard UI
source labels
safe result IDs
file names
sanitized snippets
release/tag pages
README demo section

Not allowed:

absolute local filesystem paths
private raw memory contents
emails
archives
.env files
tokens
credentials
private personal documents
finance, health, authority, or legal documents
README Embedding

After screenshots are created, embed them in the README like this:

![Home dashboard](docs/screenshots/01-home-dashboard.png)

![Portfolio-safe search output](docs/screenshots/03-search-api-portfolio-safe-output.png)
Screenshot Review Checklist

Before committing screenshots:

git status --short
find docs/screenshots -maxdepth 1 -type f -print

Manually inspect each image before commit.
