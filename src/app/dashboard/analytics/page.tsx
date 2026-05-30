import type { Metadata } from "next";
import { BarChart, StatCard } from "@/components/stat-card";

export const metadata: Metadata = { title: "Admin Analytics" };

const views = [
  { label: "Jan", value: 32 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 55 },
  { label: "May", value: 72 },
  { label: "Jun", value: 64 },
];

const pipeline = [
  { label: "New", value: 42, color: "bg-sky-400" },
  { label: "Contacted", value: 28, color: "bg-amber-400" },
  { label: "Booked", value: 19, color: "bg-violet-400" },
  { label: "Closed", value: 11, color: "bg-emerald-400" },
];

export default function AnalyticsPage() {
  const total = pipeline.reduce((s, p) => s + p.value, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Admin Analytics</h1>
      <p className="mt-1 text-[var(--muted)]">Platform-wide performance across all agents.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value="$4.2M" delta="18%" />
        <StatCard label="Listings sold" value="312" delta="9%" />
        <StatCard label="Avg. days on market" value="34" delta="6%" positive={false} />
        <StatCard label="Active agents" value="3,204" delta="4%" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-semibold">Listing views (thousands)</h2>
          <p className="text-sm text-[var(--muted)]">Last 6 months</p>
          <div className="mt-6">
            <BarChart data={views} />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold">Lead pipeline</h2>
          <p className="text-sm text-[var(--muted)]">{total} active leads</p>
          <div className="mt-6 space-y-4">
            {pipeline.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between text-sm">
                  <span>{p.label}</span>
                  <span className="text-[var(--muted)]">{p.value}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${(p.value / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
