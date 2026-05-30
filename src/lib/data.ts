import type { Agent, Inquiry, Property } from "./types";

/**
 * In production this layer is backed by PostgreSQL (via Prisma) behind a
 * Node API. For the demo it returns deterministic in-memory fixtures with the
 * same shape the real API contract exposes, so the UI is fully wired.
 */

export const agents: Agent[] = [
  { id: "a1", name: "Sara Mansour", avatar: "SM", title: "Senior Agent", rating: 4.9, deals: 128 },
  { id: "a2", name: "Omar Khalil", avatar: "OK", title: "Listing Specialist", rating: 4.7, deals: 94 },
  { id: "a3", name: "Lena Fischer", avatar: "LF", title: "Luxury Advisor", rating: 5.0, deals: 211 },
];

const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/600`;

export const properties: Property[] = [
  {
    id: "p1", slug: "skyline-penthouse-downtown", title: "Skyline Penthouse",
    description: "A sun-drenched penthouse with floor-to-ceiling glass, a private terrace, and uninterrupted skyline views. Smart-home enabled throughout.",
    price: 1850000, status: "for-sale", type: "apartment", city: "Dubai", address: "Marina Walk 12",
    beds: 3, baths: 3, area: 2400, image: img("estate1"), featured: true, agentId: "a3",
    createdAt: "2026-05-02", tags: ["luxury", "city", "terrace", "smart-home"],
  },
  {
    id: "p2", slug: "garden-villa-palm", title: "Garden Villa",
    description: "Family villa with a landscaped garden, private pool, and an open-plan kitchen designed for entertaining.",
    price: 3200000, status: "for-sale", type: "villa", city: "Dubai", address: "Palm Frond E",
    beds: 5, baths: 6, area: 6100, image: img("estate2"), featured: true, agentId: "a1",
    createdAt: "2026-05-10", tags: ["luxury", "family", "pool", "garden"],
  },
  {
    id: "p3", slug: "minimal-loft-creek", title: "Minimal Creek Loft",
    description: "Industrial-chic loft moments from the waterfront with exposed concrete, high ceilings, and a chef's kitchen.",
    price: 7800, status: "for-rent", type: "apartment", city: "Cairo", address: "Creek District 4",
    beds: 1, baths: 1, area: 950, image: img("estate3"), featured: false, agentId: "a2",
    createdAt: "2026-05-18", tags: ["modern", "city", "waterfront"],
  },
  {
    id: "p4", slug: "coastal-townhouse-marsa", title: "Coastal Townhouse",
    description: "Three-storey townhouse a short stroll from the beach, with a rooftop lounge and direct community-pool access.",
    price: 980000, status: "for-sale", type: "townhouse", city: "Alexandria", address: "Marsa Bay 7",
    beds: 4, baths: 4, area: 3100, image: img("estate4"), featured: true, agentId: "a1",
    createdAt: "2026-05-21", tags: ["family", "beach", "pool"],
  },
  {
    id: "p5", slug: "studio-business-bay", title: "Business Bay Studio",
    description: "Efficient, fully-furnished studio ideal for professionals, with concierge, gym, and co-working access.",
    price: 5200, status: "for-rent", type: "studio", city: "Dubai", address: "Bay Square 9",
    beds: 0, baths: 1, area: 480, image: img("estate5"), featured: false, agentId: "a2",
    createdAt: "2026-05-24", tags: ["modern", "city", "furnished"],
  },
  {
    id: "p6", slug: "heritage-house-zamalek", title: "Heritage House",
    description: "Restored heritage home blending classic architecture with modern comforts on a quiet tree-lined street.",
    price: 1450000, status: "pending", type: "house", city: "Cairo", address: "Zamalek 22",
    beds: 4, baths: 3, area: 3800, image: img("estate6"), featured: false, agentId: "a3",
    createdAt: "2026-04-28", tags: ["family", "garden", "classic"],
  },
  {
    id: "p7", slug: "lakeview-villa-newcairo", title: "Lakeview Villa",
    description: "Contemporary villa overlooking the lake, with smart climate control, home cinema, and a double garage.",
    price: 2750000, status: "for-sale", type: "villa", city: "Cairo", address: "Lake District 1",
    beds: 5, baths: 5, area: 5400, image: img("estate7"), featured: true, agentId: "a3",
    createdAt: "2026-05-27", tags: ["luxury", "family", "smart-home", "lake"],
  },
  {
    id: "p8", slug: "downtown-apartment-marina", title: "Marina Apartment",
    description: "Bright two-bed apartment with a balcony over the marina, walk-in wardrobes, and resident parking.",
    price: 690000, status: "sold", type: "apartment", city: "Dubai", address: "Marina Gate 3",
    beds: 2, baths: 2, area: 1250, image: img("estate8"), featured: false, agentId: "a2",
    createdAt: "2026-04-15", tags: ["modern", "city", "waterfront"],
  },
];

export const inquiries: Inquiry[] = [
  { id: "i1", propertyId: "p1", name: "Daniel Roy", email: "daniel@mail.com", message: "Is the terrace furnished? Keen to view this weekend.", status: "new", createdAt: "2026-05-28" },
  { id: "i2", propertyId: "p2", name: "Aya Hassan", email: "aya@mail.com", message: "Can we arrange financing details?", status: "contacted", createdAt: "2026-05-27" },
  { id: "i3", propertyId: "p4", name: "Mark Lfield", email: "mark@mail.com", message: "Booking a viewing for the townhouse.", status: "booked", createdAt: "2026-05-26" },
  { id: "i4", propertyId: "p7", name: "Nadia Saleh", email: "nadia@mail.com", message: "Does the price include the cinema setup?", status: "new", createdAt: "2026-05-29" },
];

// ---- Simulated async API (mirrors the real REST contract) ----

const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export async function getProperties(): Promise<Property[]> {
  await wait();
  return properties;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  await wait();
  return properties.filter((p) => p.featured);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  await wait();
  return properties.find((p) => p.slug === slug) ?? null;
}

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export async function getInquiries(): Promise<(Inquiry & { property?: Property })[]> {
  await wait();
  return inquiries.map((i) => ({ ...i, property: properties.find((p) => p.id === i.propertyId) }));
}
