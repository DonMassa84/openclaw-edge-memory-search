import { NextRequest, NextResponse } from "next/server";
import { scanDocs, searchDocs } from "../../lib/scanner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RawSearchItem = {
  id?: string;
  title?: string;
  path?: string;
  source?: string;
  modified?: string;
  size?: number;
  snippet?: string;
  text?: string;
};

function cleanSnippet(value: unknown): string {
  return String(value ?? "")
    .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 280);
}

function basename(value: unknown): string {
  const raw = String(value ?? "");
  const parts = raw.split("/").filter(Boolean);
  return parts[parts.length - 1] || "local-document.md";
}

function sourceLabel(value: unknown): string {
  const raw = String(value ?? "").toLowerCase();

  if (raw.includes("/reports")) return "OpenClaw Reports";
  if (raw.includes("/memory")) return "OpenClaw Memory";
  if (raw.includes("/docs")) return "OpenClaw Docs";
  if (raw.includes("/projects")) return "OpenClaw Projects";
  if (raw.includes("/prompts")) return "OpenClaw Prompts";
  if (raw.includes("/inbox")) return "OpenClaw Inbox";
  if (raw.includes("agent_md")) return "Agent Markdown Workspace";
  if (raw.includes(".openclaw")) return "OpenClaw Workspace";

  return "Local Workspace";
}

function safeResult(item: RawSearchItem, index: number) {
  const sourceInput = item.source || item.path || "";
  const fileName = basename(item.path || item.title);

  return {
    id: `result_${String(index + 1).padStart(3, "0")}`,
    title: item.title || fileName,
    fileName,
    sourceLabel: sourceLabel(sourceInput),
    modified: item.modified ?? null,
    size: item.size ?? null,
    snippet: cleanSnippet(item.snippet),
  };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const unsafeRequested = req.nextUrl.searchParams.get("unsafe") === "1";
  const unsafeAllowed = process.env.OPENCLAW_ALLOW_UNSAFE_PATHS === "1";
  const allowUnsafe = unsafeRequested && unsafeAllowed;

  const docs = await scanDocs();
  const rawResults = searchDocs(docs, q).map(({ text, ...rest }: RawSearchItem) => rest);

  const dedupedRaw = Array.from(
    new Map(
      rawResults.map((item: RawSearchItem) => [
        item.path || item.id || item.title || JSON.stringify(item),
        item,
      ]),
    ).values(),
  ) as RawSearchItem[];

  const results = allowUnsafe
    ? dedupedRaw
    : dedupedRaw.map((item, index) => safeResult(item, index));

  return NextResponse.json({
    query: q,
    count: results.length,
    privacy: allowUnsafe ? "unsafe-local-debug-output" : "portfolio-safe-output",
    results,
  });
}
