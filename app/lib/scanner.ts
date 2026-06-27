import fs from "node:fs/promises";
import path from "node:path";
import { defaultSources, isAllowedFile } from "./paths";

export type IndexedDoc = {
  id: string;
  title: string;
  path: string;
  source: string;
  modified: string;
  size: number;
  snippet: string;
  text: string;
};

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir: string, limit = 1500): Promise<string[]> {
  const out: string[] = [];

  async function inner(current: string) {
    if (out.length >= limit) return;

    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (out.length >= limit) return;

      const full = path.join(current, entry.name);

      if (entry.isDirectory()) {
        if (
          entry.name === ".git" ||
          entry.name === "node_modules" ||
          entry.name === "secrets" ||
          entry.name === "tokens"
        ) continue;

        await inner(full);
      } else if (entry.isFile() && isAllowedFile(full)) {
        out.push(full);
      }
    }
  }

  await inner(dir);
  return out;
}

function titleFromText(file: string, text: string): string {
  const firstHeading = text.split(/\r?\n/).find(line => line.trim().startsWith("# "));
  if (firstHeading) return firstHeading.replace(/^#\s+/, "").trim().slice(0, 120);
  return path.basename(file);
}

function cleanSnippet(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 280);
}

export async function scanDocs(): Promise<IndexedDoc[]> {
  const sources = defaultSources();
  const docs: IndexedDoc[] = [];

  for (const source of sources) {
    if (!(await exists(source))) continue;

    const files = await walk(source);

    for (const file of files) {
      try {
        const stat = await fs.stat(file);
        if (stat.size > 1_500_000) continue;

        const text = await fs.readFile(file, "utf8");

        docs.push({
          id: Buffer.from(file).toString("base64url"),
          title: titleFromText(file, text),
          path: file,
          source,
          modified: stat.mtime.toISOString(),
          size: stat.size,
          snippet: cleanSnippet(text),
          text
        });
      } catch {
        continue;
      }
    }
  }

  return docs.sort((a, b) => b.modified.localeCompare(a.modified));
}

export function searchDocs(docs: IndexedDoc[], query: string): IndexedDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return docs.slice(0, 50);

  const terms = q.split(/\s+/).filter(Boolean);

  return docs
    .map(doc => {
      const hay = `${doc.title}\n${doc.path}\n${doc.text}`.toLowerCase();
      let score = 0;

      for (const term of terms) {
        const titleHit = doc.title.toLowerCase().includes(term) ? 5 : 0;
        const pathHit = doc.path.toLowerCase().includes(term) ? 3 : 0;
        const textHit = hay.includes(term) ? 1 : 0;
        score += titleHit + pathHit + textHit;
      }

      return { doc, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || b.doc.modified.localeCompare(a.doc.modified))
    .slice(0, 80)
    .map(x => x.doc);
}
