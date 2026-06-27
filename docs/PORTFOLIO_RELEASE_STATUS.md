
Portfolio Release Status
Project

OpenClaw Edge Memory Search

Current Safe Public Releases
Release	Status	Meaning
v0.1.0-edge-memory-search	published	initial prototype
v0.1.1-portfolio-safe-api	published	API output sanitized for portfolio demos
v0.1.2-demo-docs	latest	portfolio demo documentation added
Current Safe Baseline

The current safe baseline is:

v0.1.2-demo-docs

This release is safe because:

API status output uses source labels instead of raw paths
search output uses safe result IDs
raw local paths are not intentionally exposed by API fields
documentation describes the safe demo posture
screenshot artifacts were not committed after the screenshot gate detected unsafe output
Screenshot Status

Screenshots are intentionally not part of the current release.

Reason:

Screenshot workflow detected a home-path leak and stopped.

This is the correct security outcome.

Security Rule

Portfolio screenshots must be generated only after UI-visible snippets are sanitized.

Next Recommended Work
v0.1.3-snippet-sanitizer

Scope:

sanitize snippets before rendering
sanitize API result snippets if needed
add regression test for home-path patterns
rerun screenshot workflow
commit only verified safe screenshots
publish release notes
