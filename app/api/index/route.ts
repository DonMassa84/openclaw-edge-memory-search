import { NextResponse } from "next/server";
import { scanDocs } from "../../lib/scanner";

export const dynamic = "force-dynamic";

export async function POST() {
  const docs = await scanDocs();

  return NextResponse.json({
    indexed: docs.length,
    note: "Index is computed live in this MVP. SQLite/cache can be added later."
  });
}
