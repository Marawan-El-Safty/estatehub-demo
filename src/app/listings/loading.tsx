import { PropertyCardSkeleton } from "@/components/property-card";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="skeleton h-9 w-40 rounded" />
      <div className="skeleton mt-2 h-5 w-56 rounded" />
      <div className="skeleton mt-8 h-16 w-full rounded-xl" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
