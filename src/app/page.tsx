import Link from "next/link";
import { getFeaturedProperties } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";

export default async function HomePage() {
  const featured = await getFeaturedProperties();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6">
        <div className="animate-fade-up max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            AI-powered property matching
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            Find a home that <span className="text-[var(--primary)]">fits your life</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
            EstateHub brings listings, agents, bookings, and analytics into one fast,
            scalable platform — with smart recommendations that learn what you love.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/listings"
              className="rounded-xl bg-[var(--primary)] px-6 py-3 font-medium text-white shadow-lg shadow-[var(--primary)]/25 transition-transform hover:-translate-y-0.5"
            >
              Explore listings
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border bg-[var(--surface)] px-6 py-3 font-medium transition-colors hover:border-[var(--primary)]/50"
            >
              Agent dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["12,400+", "Active listings"],
            ["3,200", "Verified agents"],
            ["98%", "Match satisfaction"],
            ["48 hrs", "Avg. time to viewing"],
          ].map(([value, label]) => (
            <div key={label} className="card p-5">
              <dt className="text-2xl font-semibold text-[var(--foreground)]">{value}</dt>
              <dd className="mt-1 text-sm text-[var(--muted)]">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured homes</h2>
            <p className="mt-1 text-[var(--muted)]">Hand-picked listings updated daily.</p>
          </div>
          <Link href="/listings" className="text-sm text-[var(--primary)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Smart booking", "Schedule viewings and inquiries in two taps. Agents get instant notifications."],
            ["CRM built-in", "Track every lead from first inquiry to signed contract in one pipeline."],
            ["AI recommendations", "Buyers see homes ranked by how well they match their taste and budget."],
          ].map(([title, body]) => (
            <div key={title} className="card p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
