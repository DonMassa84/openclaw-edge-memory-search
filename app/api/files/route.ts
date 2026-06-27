import { NextResponse } from "next/server";
import { scanDocs } from "../../lib/scanner";

export const dynamic = "force-dynamic";

export async function GET() {
  const docs = await scanDocs();

  return NextResponse.json({
    count: docs.length,
    files: docs.map(({ text, ...safe }) => safe)
  });
}
