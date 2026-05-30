# EstateHub — Architecture Overview

A proposed architecture for a scalable real estate SaaS platform: property
listings, agent dashboards, an inquiry/booking system, CRM, authentication,
admin analytics, and AI-based recommendations.

This document accompanies the working demo in this repository.

---

## 1. High-level shape

```
                         ┌──────────────────────────┐
                         │        Clients            │
                         │  Web (Next.js)  ·  Mobile │
                         └────────────┬─────────────┘
                                      │ HTTPS / JSON
                         ┌────────────▼─────────────┐
                         │   Next.js (App Router)    │
                         │  • SSR/SSG public pages   │
                         │  • RSC data fetching      │
                         │  • Route handlers (BFF)   │
                         └────────────┬─────────────┘
                                      │
        ┌─────────────────┬──────────┼───────────────┬──────────────────┐
        ▼                 ▼          ▼                ▼                  ▼
  ┌──────────┐    ┌──────────────┐ ┌─────────┐ ┌──────────────┐  ┌────────────┐
  │ Auth      │   │  Node API     │ │ Postgres │ │ Recommender   │ │ Object     │
  │ (JWT/     │   │ (NestJS/      │ │ + Prisma │ │ service       │ │ storage    │
  │  Clerk)   │   │  Express)     │ │ pgvector │ │ (embeddings)  │ │ (S3/Blob)  │
  └──────────┘    └──────────────┘ └─────────┘ └──────────────┘  └────────────┘
                          │
                    ┌─────▼─────┐
                    │ Redis      │  cache · rate-limit · job queue
                    └───────────┘
```

## 2. Tech stack

| Layer            | Choice                                  | Why |
|------------------|-----------------------------------------|-----|
| Frontend         | **Next.js (App Router) + TypeScript**   | SSR/SSG for SEO on public listings, React Server Components to keep bundles small, one framework for marketing + app. |
| Styling / UI     | **Tailwind CSS + shadcn/ui**            | Consistent design system, fast iteration, accessible primitives. |
| API              | **Node.js (NestJS)** or Next route handlers | NestJS gives modular, testable, typed services as the platform grows; Next route handlers act as a BFF/edge layer. |
| Database         | **PostgreSQL + Prisma**                 | Relational data (listings, agents, leads) with strong typing and migrations. |
| Vector search    | **pgvector**                            | Embedding similarity for recommendations without a separate vector DB. |
| Auth             | **Clerk / Auth.js (JWT + RBAC)**        | Buyer, Agent, Admin roles; social + email login. |
| Cache / queue    | **Redis (Upstash)**                     | Response caching, rate limiting, async jobs (emails, notifications). |
| Storage          | **S3 / Vercel Blob**                    | Property images, documents. |
| Hosting          | **Vercel** (frontend) + **AWS/Fly** (API) | Edge-rendered frontend; containerized API that scales horizontally. |
| Observability    | Sentry + Vercel Analytics               | Errors, Core Web Vitals, usage. |

## 3. Data model (core entities)

```
User (id, role[buyer|agent|admin], email, ...)
Agent (id → User, agency, rating, deals)
Property (id, slug, title, price, status, type, city, beds, baths, area,
          images[], embedding vector, agentId → Agent)
Inquiry (id, propertyId → Property, userId → User, message,
          status[new|contacted|booked|closed], createdAt)   ← CRM pipeline
Booking (id, inquiryId, scheduledAt, status)
Favorite (userId, propertyId)                                ← recommendation signal
```

The CRM is the `Inquiry` lifecycle: every lead flows
`new → contacted → booked → closed`, which also feeds the admin analytics
funnel.

## 4. Rendering strategy (SEO-critical)

- **Public listing pages** → SSG with `generateStaticParams` + ISR
  revalidation, so each property is a fast, crawlable static page.
- **Listings index / search** → server-fetched with client-side filtering for
  instant interaction.
- **Dashboards & analytics** → authenticated, dynamically rendered, data
  fetched in Server Components.
- **Mutations** (inquiry, booking) → route handlers / server actions with
  validation, then revalidate affected tags.

## 5. AI recommendations

Two-phase, behind one stable `recommend()` interface:

1. **MVP (shipped in this demo):** content-based scoring — weighted similarity
   over tags, location, type, price proximity, and bedrooms. Zero external
   dependencies, fully explainable.
2. **Scale-up:** embed listing descriptions + capture user behaviour
   (views, favorites, inquiries) → store vectors in **pgvector** → rank by
   cosine similarity, optionally re-ranked by a lightweight model. The UI
   contract never changes.

## 6. Security & scalability

- Role-based access control (buyer / agent / admin) enforced server-side.
- Input validation with Zod on every mutation; parameterized Prisma queries.
- Rate limiting + caching at the Redis/edge layer.
- Stateless API → horizontal autoscaling; Postgres read replicas as traffic grows.
- Image optimization via `next/image`; CDN-cached static pages.

## 7. Delivery plan (phased)

| Phase | Scope | Outcome |
|-------|-------|---------|
| 1 | Listings + search + property pages (SEO) | Public site live |
| 2 | Auth + roles + inquiry/booking | Buyers convert to leads |
| 3 | Agent dashboard + CRM pipeline | Agents manage leads |
| 4 | Admin analytics | Platform-wide insight |
| 5 | AI recommendations (content → vector) | Personalized discovery |

Each phase ships independently and is deployable on its own.
