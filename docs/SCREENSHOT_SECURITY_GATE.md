# Screenshot Security Gate

## Purpose

This document explains why screenshot generation is blocked when local-path leakage is detected.

## Background

The project is intended for portfolio-safe public demonstration. Screenshots must not expose private local machine details, absolute local paths, raw runtime data, private archive names, tokens, credentials, or other sensitive material.

## Current Behavior

Screenshot generation is allowed only after a leak check passes.

If the leak check detects a local home-path pattern, the screenshot workflow must stop.

Expected safe behavior:

```text
[FEHLER] home-path leak found. Screenshots are not generated.
Decision

The screenshot workflow must fail closed.

That means:

no screenshots are created
no screenshot HTML is committed
README is restored if modified by the screenshot workflow
generated runtime screenshot artifacts are removed
portfolio releases remain clean
Safe Portfolio State

The current safe public state is the documentation/API release without screenshots.

Screenshots may be added only after a snippet sanitizer prevents private path fragments from appearing in UI output.

Next Safe Release

Planned release:

v0.1.3-snippet-sanitizer

Goal:

sanitize snippets
sanitize UI output
prevent private local path fragments
rerun screenshot workflow
commit only verified safe screenshots
Do Not Commit
generated browser HTML
unsafe screenshots
local absolute paths
runtime dumps
private file names
raw local indexes
secrets
tokens
credentials
