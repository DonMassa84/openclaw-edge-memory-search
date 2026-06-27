import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LocalSource = {
  label: string;
  path: string;
};

function getLocalSources(): LocalSource[] {
  const home = process.env.HOME ?? "";

  return [
    {
      label: "OpenClaw Workspace",
      path: path.join(home, ".openclaw", "workspace"),
    },
    {
      label: "Agent Markdown Workspace",
      path: path.join(home, "shadowmaker_control_center", "agent_md"),
    },
    {
      label: "OpenClaw Reports",
      path: path.join(home, ".openclaw", "workspace", "reports"),
    },
    {
      label: "OpenClaw Memory",
      path: path.join(home, ".openclaw", "workspace", "memory"),
    },
    {
      label: "OpenClaw Docs",
      path: path.join(home, ".openclaw", "workspace", "docs"),
    },
    {
      label: "OpenClaw Projects",
      path: path.join(home, ".openclaw", "workspace", "projects"),
    },
  ];
}

export async function GET() {
  const sources = getLocalSources().map((source, index) => ({
    id: `source_${String(index + 1).padStart(2, "0")}`,
    label: source.label,
    exists: fs.existsSync(source.path),
  }));

  return NextResponse.json({
    app: "openclaw-edge-memory-search",
    mode: "local-first",
    privacy: "no external API calls",
    sources,
    services: {
      openclawGateway: "active",
      discordRouter: "active",
      telegramSkillBot: "active",
    },
  });
}
