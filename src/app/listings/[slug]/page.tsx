import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAgent, getPropertyBySlug, getProperties, properties } from "@/lib/data";
import { recommend } from "@/lib/recommend";
import { formatPrice, statusLabel, statusStyle } from "@/lib/format";
import { PropertyCard } from "@/components/property-card";
import { InquiryForm } from "./inquiry-form";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: property.description,
    openGraph: { images: [property.image], title: property.title },
  };
}

export default async function PropertyPage({ params }: PageProps<"/listings/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const pool = await getProperties();
  const recommendations = recommend(property, pool);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Main */}
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border">
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-medium ${statusStyle[property.status]}`}
            >
              {statusLabel[property.status]}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{property.title}</h1>
              <p className="mt-1 text-[var(--muted)]">
                {property.address}, {property.city}
              </p>
            </div>
            <span className="text-2xl font-semibold text-[var(--primary)]">
              {formatPrice(property.price, property.status)}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              ["Bedrooms", property.beds],
              ["Bathrooms", property.baths],
              ["Area", `${property.area.toLocaleString()} sqft`],
            ].map(([label, value]) => (
              <div key={label} className="card p-4 text-center">
                <div className="text-xl font-semibold">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-[var(--muted)]">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">About this home</h2>
            <p className="mt-2 leading-relaxed text-[var(--muted)]">{property.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {property.tags.map((t) => (
                <span key={t} className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs capitalize">
                  {t.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {agent && (
            <div className="card p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--primary)] font-semibold text-white">
                  {agent.avatar}
                </div>
                <div>
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-sm text-[var(--muted)]">{agent.title}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-[var(--muted)]">
                <span>⭐ {agent.rating} rating</span>
                <span>{agent.deals} deals closed</span>
              </div>
            </div>
          )}
          <InquiryForm propertyTitle={property.title} />
        </aside>
      </div>

      {/* AI recommendations */}
      <section className="mt-16">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
            AI match
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">Similar homes you may like</h2>
        </div>
        <p className="mt-1 text-[var(--muted)]">
          Ranked by feature, location, and budget similarity to this listing.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
