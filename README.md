# EstateHub — Real Estate SaaS (Demo)

A working demo of a modern real estate SaaS platform, built for an Upwork
proposal. It showcases the core pillars of the brief: **property listings,
agent dashboards, an inquiry/booking system, CRM, admin analytics, and
AI-based recommendations** — built on Next.js + TypeScript.

> This is a front-end demo wired to an in-memory data layer that mirrors the
> real REST contract. Swapping it for a Node + PostgreSQL backend means
> changing only `src/lib/data.ts`. See [`ARCHITECTURE.md`](./ARCHITECTURE.md)
> for the full production design.

## Features shown

- **Landing page** — hero, live stats, featured listings (SEO-optimized, SSG).
- **Listings** (`/listings`) — search + city/type filters, empty & loading states.
- **Property detail** (`/listings/[slug]`) — gallery, agent card, booking form,
  and **AI-ranked similar homes**. Statically generated per listing with
  dynamic metadata.
- **Agent dashboard** (`/dashboard`) — KPIs, listings table, CRM inquiry pipeline.
- **Admin analytics** (`/dashboard/analytics`) — revenue/views charts, lead funnel.

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Server Components + SSG/ISR.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production

```bash
npm run build
npm start
```

Deploy to Vercel: push to GitHub and import the repo, or run `vercel`.

## Where the "backend" lives

`src/lib/data.ts` exposes async functions (`getProperties`,
`getPropertyBySlug`, `getInquiries`, …) with artificial latency so loading
states are real. In production these become `fetch()` calls to the Node API;
`src/lib/recommend.ts` becomes a pgvector similarity query behind the same
signature.

## Structure

```
src/
├─ app/
│  ├─ page.tsx                  # landing
│  ├─ listings/                 # index, filters, [slug] detail, loading
│  └─ dashboard/                # agent dashboard + analytics
├─ components/                  # navbar, footer, cards, charts
└─ lib/                         # types, data layer, recommender, formatters
```
