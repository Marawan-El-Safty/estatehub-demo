"use client";

import { useMemo, useState } from "react";
import type { Property, PropertyType } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";

const types: (PropertyType | "all")[] = ["all", "house", "apartment", "villa", "townhouse", "studio"];

export function ListingsExplorer({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PropertyType | "all">("all");
  const [city, setCity] = useState("all");

  const cities = useMemo(
    () => ["all", ...Array.from(new Set(properties.map((p) => p.city)))],
    [properties],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q));
      const matchesType = type === "all" || p.type === type;
      const matchesCity = city === "all" || p.city === city;
      return matchesQuery && matchesType && matchesCity;
    });
  }, [properties, query, type, city]);

  return (
    <div className="mt-8">
      {/* Filter bar */}
      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, area, or feature…"
          className="flex-1 rounded-lg border bg-[var(--surface-2)] px-3 py-2 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-lg border bg-[var(--surface-2)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All cities" : c}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as PropertyType | "all")}
          className="rounded-lg border bg-[var(--surface-2)] px-3 py-2 text-sm capitalize outline-none focus:border-[var(--primary)]"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="card mt-6 grid place-items-center px-6 py-20 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--surface-2)] text-xl">
            🔍
          </div>
          <h3 className="mt-4 font-semibold">No properties match your filters</h3>
          <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
            Try clearing the search or widening your city and type selection.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setType("all");
              setCity("all");
            }}
            className="mt-4 rounded-lg border px-4 py-2 text-sm transition-colors hover:border-[var(--primary)]/50"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
