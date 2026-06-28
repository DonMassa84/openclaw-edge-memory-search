#!/usr/bin/env bash
set -Eeuo pipefail
test -s docs/data/AI_DATA_ANALYSIS_PROMPT_6_COMPONENTS.md
test -s docs/data/AI_DATA_ANALYSIS_WORKFLOW.md
test -s docs/data/DATA_CLEANING_CHECKLIST.md
test -s docs/data/DATA_REPORT_TEMPLATE.md
echo [OK]
data-analysis-doctor
