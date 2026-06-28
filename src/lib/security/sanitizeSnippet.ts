/**
 * OpenClaw Snippet Sanitizer
 *
 * Purpose:
 * Prevent local path leakage in portfolio-safe API/search outputs.
 *
 * This module is intentionally dependency-free.
 */

export type SanitizeSnippetOptions = {
  replacement?: string;
  maxLength?: number;
};

const DEFAULT_REPLACEMENT = "[REDACTED_PATH]";

const PATH_PATTERNS: RegExp[] = [
  /\/home\/[A-Za-z0-9._-]+\/[^\s"'`<>)]*/g,
  /\/mnt\/[A-Za-z0-9._/-]+/g,
  /\/media\/[A-Za-z0-9._/-]+/g,
  /C:\\Users\\[A-Za-z0-9._-]+\\[^\s"'`<>)]*/gi,
  /Users\/[A-Za-z0-9._-]+\/[^\s"'`<>)]*/g,
  /file:\/\/[^\s"'`<>)]*/g,
];

const SECRET_LIKE_PATTERNS: RegExp[] = [
  /sk-[A-Za-z0-9_-]{16,}/g,
  /ghp_[A-Za-z0-9_]{16,}/g,
  /github_pat_[A-Za-z0-9_]{16,}/g,
  /xox[baprs]-[A-Za-z0-9-]{16,}/g,
];

export function sanitizeSnippet(
  input: unknown,
  options: SanitizeSnippetOptions = {},
): string {
  const replacement = options.replacement ?? DEFAULT_REPLACEMENT;
  const maxLength = options.maxLength ?? 1200;

  if (input === null || input === undefined) return "";

  let output = String(input);

  for (const pattern of PATH_PATTERNS) {
    output = output.replace(pattern, replacement);
  }

  for (const pattern of SECRET_LIKE_PATTERNS) {
    output = output.replace(pattern, "[REDACTED_SECRET]");
  }

  output = output.replace(/\s+/g, " ").trim();

  if (output.length > maxLength) {
    output = `${output.slice(0, maxLength)}…`;
  }

  return output;
}

export function sanitizeResultObject<T extends Record<string, unknown>>(result: T): T {
  const clone: Record<string, unknown> = { ...result };

  for (const key of Object.keys(clone)) {
    if (
      key.toLowerCase().includes("snippet") ||
      key.toLowerCase().includes("preview") ||
      key.toLowerCase().includes("summary") ||
      key.toLowerCase().includes("content") ||
      key.toLowerCase().includes("path")
    ) {
      clone[key] = sanitizeSnippet(clone[key]);
    }
  }

  return clone as T;
}
