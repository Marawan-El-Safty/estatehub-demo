import type { Metadata } from "next";
import Link from "next/link";
import { getInquiries, getProperties } from "@/lib/data";
import { StatCard } from "@/components/stat-card";
import { formatPrice, statusLabel, statusStyle } from "@/lib/format";

export const metadata: Metadata = { title: "Agent Dashboard" };

const inquiryStyle: Record<string, string> = {
  new: "bg-sky-500/15 text-sky-300",
  contacted: "bg-amber-500/15 text-amber-300",
  booked: "bg-violet-500/15 text-violet-300",
  closed: "bg-emerald-500/15 text-emerald-300",
};

export default async function DashboardPage() {
  const [properties, inquiries] = await Promise.all([getProperties(), getInquiries()]);
  const active = properties.filter((p) => p.status === "for-sale" || p.status === "for-rent");
  const newLeads = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Agent Dashboard</h1>
          <p className="mt-1 text-[var(--muted)]">Welcome back, Sara. Here&apos;s today&apos;s pipeline.</p>
        </div>
        <Link
          href="/dashboard/analytics"
          className="rounded-lg border px-4 py-2 text-sm transition-colors hover:border-[var(--primary)]/50"
        >
          View analytics →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active listings" value={String(active.length)} delta="8%" />
        <StatCard label="New leads" value={String(newLeads)} delta="12%" />
        <StatCard label="Viewings booked" value="9" delta="3%" />
        <StatCard label="Conversion rate" value="24%" delta="2%" positive={false} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* My listings */}
        <div className="card overflow-hidden">
          <div className="border-b px-5 py-4 font-semibold">My listings</div>
          <div className="divide-y">
            {active.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.title}</div>
                  <div className="truncate text-sm text-[var(--muted)]">
                    {p.city} · {p.beds} bd · {p.area.toLocaleString()} sqft
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[p.status]}`}>
                    {statusLabel[p.status]}
                  </span>
                  <span className="whitespace-nowrap font-medium text-[var(--primary)]">
                    {formatPrice(p.price, p.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent inquiries (CRM) */}
        <div className="card overflow-hidden">
          <div className="border-b px-5 py-4 font-semibold">Recent inquiries</div>
          <div className="divide-y">
            {inquiries.map((i) => (
              <div key={i.id} className="px-5 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{i.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${inquiryStyle[i.status]}`}>
                    {i.status}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-[var(--muted)]">{i.message}</p>
                {i.property && (
                  <p className="mt-1 text-xs text-[var(--muted)]">on {i.property.title}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
