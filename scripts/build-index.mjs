import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const sources = [
  process.env.OPENCLAW_WORKSPACE || path.join(os.homedir(), ".openclaw/workspace"),
  process.env.OPENCLAW_AGENT_MD || path.join(os.homedir(), "shadowmaker_control_center/agent_md")
];

function allowed(file) {
  const lower = file.toLowerCase();
  return [".md", ".txt", ".json"].some(ext => lower.endsWith(ext)) &&
    !lower.includes("/secrets/") &&
    !lower.includes("/tokens/") &&
    !lower.endsWith(".env");
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules", "secrets", "tokens"].includes(entry.name)) continue;
      walk(full, out);
    } else if (entry.isFile() && allowed(full)) {
      out.push(full);
    }
  }
  return out;
}

const files = sources.flatMap(s => walk(s));
console.log(JSON.stringify({ indexed: files.length, files }, null, 2));
