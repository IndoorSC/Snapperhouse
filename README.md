# Snapperhouse

Australian aquarium hobbyist marketplace — **Your Site, Your Store**.

Built from the Snapperhouse Functional Specification v3.0 (June 2026).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS v4
- **Supabase** schema ready (`supabase/schema.sql`) — Auth, Postgres, Storage, RLS
- **Stripe** credit bundles (UI wired; connect keys for live payments)
- Demo data layer so the site runs without backend credentials

## Brand

| Token | Value |
|-------|-------|
| Navy | `#1B3A5C` |
| Orange | `#F47B20` |
| Tagline | Your Site, Your Store |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included (v1 UI)

Public marketplace: home, browse/filters, search, listing detail, species pages (SSG), group browse, seller profiles, education library, Fish Trade Days.

Account flows: register/login shells, account settings, saved searches & follows, messages inbox/threads.

Seller tools: dashboard with FY summary + tax nudges, multi-step listing creation (trade status gates, completeness score), listing edit.

Admin shells: overview, taxonomy, suggestions, users, listing moderation, flag review.

## Connecting backends

1. Create a Supabase project and run `supabase/schema.sql`
2. Add env vars (see `.env.example`)
3. Replace `src/lib/data/*` reads with Supabase client queries
4. Add Stripe Payment Intents + webhook for credit ledger rows
5. Wire Resend (or similar) for notification emails
6. Deploy to Netlify

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
