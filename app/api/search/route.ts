import { NextRequest, NextResponse } from "next/server";
import { scanDocs, searchDocs } from "../../lib/scanner";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const docs = await scanDocs();

  const results = searchDocs(docs, q).map(({ text, ...safe }) => safe);

  const deduped = Array.from(
    new Map(
      results.map((item: any) => [
        item.path || item.id || item.title || JSON.stringify(item),
        item
      ])
    ).values()
  );

  return NextResponse.json({
    query: q,
    count: deduped.length,
    results: deduped
  });
}
