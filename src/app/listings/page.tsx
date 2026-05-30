import type { Metadata } from "next";
import { getProperties } from "@/lib/data";
import { ListingsExplorer } from "./listings-explorer";

export const metadata: Metadata = {
  title: "Listings",
  description: "Browse every property on EstateHub. Filter by city, type, price, and status.",
};

export default async function ListingsPage() {
  const properties = await getProperties();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Listings</h1>
      <p className="mt-1 text-[var(--muted)]">{properties.length} properties available.</p>
      <ListingsExplorer properties={properties} />
    </div>
  );
}
