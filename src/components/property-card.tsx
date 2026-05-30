import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice, statusLabel, statusStyle } from "@/lib/format";
import { getAgent } from "@/lib/data";

export function PropertyCard({ property }: { property: Property }) {
  const agent = getAgent(property.agentId);
  return (
    <Link
      href={`/listings/${property.slug}`}
      className="card group overflow-hidden transition-all hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[property.status]}`}
        >
          {statusLabel[property.status]}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{property.title}</h3>
          <span className="whitespace-nowrap font-semibold text-[var(--primary)]">
            {formatPrice(property.price, property.status)}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {property.address}, {property.city}
        </p>
        <div className="mt-4 flex items-center gap-4 border-t pt-3 text-sm text-[var(--muted)]">
          <span>{property.beds} bd</span>
          <span>{property.baths} ba</span>
          <span>{property.area.toLocaleString()} sqft</span>
          {agent && <span className="ml-auto text-xs">{agent.name}</span>}
        </div>
      </div>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[4/3]" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-4 w-full rounded" />
      </div>
    </div>
  );
}
