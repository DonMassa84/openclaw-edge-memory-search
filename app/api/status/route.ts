import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { defaultSources } from "../../lib/paths";
import fs from "node:fs/promises";

const exec = promisify(execFile);

async function cmd(command: string, args: string[]) {
  try {
    const { stdout } = await exec(command, args, { timeout: 5000 });
    return stdout.trim();
  } catch (err: any) {
    return err?.message || "unavailable";
  }
}

async function exists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export const dynamic = "force-dynamic";

export async function GET() {
  const sources = defaultSources();
  const sourceStatus = await Promise.all(
    sources.map(async s => ({ path: s, exists: await exists(s) }))
  );

  return NextResponse.json({
    app: "openclaw-edge-memory-search",
    mode: "local-first",
    privacy: "no external API calls",
    sources: sourceStatus,
    services: {
      openclawGateway: await cmd("systemctl", ["--user", "is-active", "openclaw-gateway.service"]),
      discordRouter: await cmd("systemctl", ["--user", "is-active", "shadowmaker-discord-agent-router.service"]),
      telegramSkillBot: await cmd("systemctl", ["--user", "is-active", "shadowmaker-telegram-skill-bot.service"])
    }
  });
}
