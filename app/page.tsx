"use client";

import { useEffect, useState } from "react";

type Result = {
  id: string;
  title: string;
  path: string;
  source: string;
  modified: string;
  size: number;
  snippet: string;
};

type Status = {
  app: string;
  mode: string;
  privacy: string;
  sources: { path: string; exists: boolean }[];
  services: Record<string, string>;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);

  async function runSearch(q = query) {
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  async function loadStatus() {
    const res = await fetch("/api/status");
    setStatus(await res.json());
  }

  useEffect(() => {
    loadStatus();
    runSearch("");
  }, []);

  return (
    <main className="min-h-screen bg-[#12091f] text-zinc-100">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-2xl border border-purple-500/40 bg-purple-950/40 p-6 shadow-2xl">
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-purple-300">
            OpenClaw / Edge / Local-first
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Edge Memory Search
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Durchsuche lokale OpenClaw Memory-, Report-, Docs- und Agent-MD-Dateien.
            Keine Cloud. Keine externen APIs. Kein Mock Data.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatusCard label="Gateway" value={status?.services?.openclawGateway || "loading"} />
          <StatusCard label="Discord Router" value={status?.services?.discordRouter || "loading"} />
          <StatusCard label="Telegram Skill Bot" value={status?.services?.telegramSkillBot || "loading"} />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-950 p-4">
          <label className="text-sm font-bold text-purple-300">Search local memory</label>
          <div className="mt-2 flex gap-2">
            <input
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-purple-400"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") runSearch();
              }}
              placeholder="z.B. Gateway, Daily Command Brief, Frist, Memory, Mission Control..."
            />
            <button
              onClick={() => runSearch()}
              className="rounded-xl bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500"
            >
              Suchen
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Results</h2>
              <span className="text-sm text-zinc-400">
                {loading ? "loading..." : `${results.length} Treffer`}
              </span>
            </div>

            {results.map((result, index) => (
              <article key={`${result.id}-${index}`} className="rounded-2xl border border-zinc-700 bg-zinc-950 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-purple-200">{result.title}</h3>
                    <p className="mt-1 break-all font-mono text-xs text-zinc-500">{result.path}</p>
                  </div>
                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                    {new Date(result.modified).toLocaleString()}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{result.snippet}</p>
              </article>
            ))}
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
              <h2 className="font-black text-purple-200">Sources</h2>
              <div className="mt-3 space-y-2">
                {status?.sources?.map((s, index) => (
                  <div key={`${s.path}-${index}`} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <div className={s.exists ? "text-green-300" : "text-red-300"}>
                      {s.exists ? "ACTIVE" : "MISSING"}
                    </div>
                    <div className="mt-1 break-all font-mono text-xs text-zinc-400">{s.path}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-4">
              <h2 className="font-black">Governance</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li>✓ Local-first</li>
                <li>✓ keine externen API Calls</li>
                <li>✓ Secrets werden nicht indexiert</li>
                <li>✓ private Daten bleiben auf dem Gerät</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  const color =
    value === "active" ? "text-green-300 border-green-500/40" :
    value === "inactive" ? "text-yellow-300 border-yellow-500/40" :
    "text-zinc-300 border-zinc-700";

  return (
    <div className={`rounded-2xl border bg-zinc-950 p-4 ${color}`}>
      <div className="text-sm uppercase tracking-widest text-zinc-500">{label}</div>
      <div className="mt-2 text-2xl font-black">{value}</div>
    </div>
  );
}
