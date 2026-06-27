import os from "node:os";
import path from "node:path";

export function expandHome(input: string): string {
  if (!input) return input;
  if (input === "~") return os.homedir();
  if (input.startsWith("~/")) return path.join(os.homedir(), input.slice(2));
  return input.replace("$HOME", os.homedir());
}

export function defaultSources() {
  const home = os.homedir();

  const raw = [
    process.env.OPENCLAW_WORKSPACE || path.join(home, ".openclaw/workspace"),
    process.env.OPENCLAW_AGENT_MD || path.join(home, "shadowmaker_control_center/agent_md"),
    process.env.OPENCLAW_REPORTS || path.join(home, ".openclaw/workspace/reports"),
    process.env.OPENCLAW_MEMORY || path.join(home, ".openclaw/workspace/memory"),
    process.env.OPENCLAW_DOCS || path.join(home, ".openclaw/workspace/docs"),
    process.env.OPENCLAW_PROJECTS || path.join(home, ".openclaw/workspace/projects")
  ];

  return Array.from(new Set(raw.map(expandHome)));
}

export function isAllowedFile(file: string): boolean {
  const lower = file.toLowerCase();

  if (
    lower.includes("/.git/") ||
    lower.includes("/node_modules/") ||
    lower.includes("/secrets/") ||
    lower.includes("/tokens/") ||
    lower.endsWith(".env") ||
    lower.includes(".env.") ||
    lower.endsWith(".key") ||
    lower.endsWith(".pem") ||
    lower.endsWith(".p12") ||
    lower.endsWith(".pfx")
  ) {
    return false;
  }

  return (
    lower.endsWith(".md") ||
    lower.endsWith(".txt") ||
    lower.endsWith(".json")
  );
}
