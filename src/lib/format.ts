import type { PropertyStatus } from "./types";

export function formatPrice(value: number, status: PropertyStatus): string {
  const compact = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return status === "for-rent" ? `${compact}/mo` : compact;
}

export const statusLabel: Record<PropertyStatus, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
  pending: "Pending",
};

export const statusStyle: Record<PropertyStatus, string> = {
  "for-sale": "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30",
  "for-rent": "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30",
  sold: "bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-500/30",
  pending: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
};
