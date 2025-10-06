# Quickstart - Restoran Kiisi Web Experience

## Prerequisites
- Node.js 20.x (aligns with Next.js 15 support matrix)
- npm 10.x or pnpm 9.x (project uses npm by default)
- PlanetScale CLI + access to Kiisi EU database branch
- SendGrid (or chosen email provider) API key for auth and reservation emails

## Environment Setup
1. Copy `.env.example` to `.env.local`.
2. Populate the following variables (mark any TBD values with `TODO` until provided):
   - `DATABASE_URL` (PlanetScale Prisma connection string)
   - `DIRECT_DATABASE_URL` (for migrations)
   - `NEXTAUTH_SECRET`
   - `EMAIL_FROM`, `SENDGRID_API_KEY`
   - `KIISI_DEFAULT_PREFERRED_REGION` (e.g., `iad1`)
   - `ORDER_PAYMENT_MODE_DEFAULT=pay_on_site`
3. Install dependencies: `npm install`.
4. Push schema: `npx prisma db push` (ensure PlanetScale branch is ready).
5. Seed starter content (menus, locations, hours, navigation): `npm run seed:content` (script authored in Phase 1).

## Running the App
- Development server with Turbopack: `npm run dev` -> http://localhost:3000
- Validate marketing routes (`/`, `/menu`, `/locations`) for streaming skeletons.
- Transactional flows:
  - `/order` -> confirm closed-hours messaging by toggling seed data or `ORDER_FORCE_CLOSED=true`.
  - `/reserve` -> inspect nearest-slot fallback for fully booked times.
  - `/account` -> create/login using email/password.

## Testing & Quality Gates
- Linting: `npm run lint`
- Unit/component tests (next/test + Vitest): `npm run test`
- Contract + integration tests (Playwright): `npm run test:e2e`
- Build profile (capture in CI): `npm run build -- --profile`
- Lighthouse smoke (performance folder): `npm run test:lh`

## Observability & Diagnostics
- Set `OTEL_EXPORTER_OTLP_ENDPOINT` before running `npm run dev:otel` for local tracing.
- Structured logs stream to console locally; configure Logflare destination in Vercel env for production.
- Uptime metric exported via custom middleware (availability ratio) and monitored in Vercel dashboards.

## Data & Content Refresh
- Marketing updates menu/promotions/navigation via Prisma seed files -> submit PR, run `npm run seed:content`, redeploy.
- Operations adjust hours/reservation policies via PlanetScale admin or SQL script; run `npm run revalidate:hours` to log tags consumed by the App Router invalidation workflow before redeploying.

## Troubleshooting
- 401 on `/account` -> verify `NEXTAUTH_SECRET` and PlanetScale connectivity.
- Order flow still showing “closed” -> ensure `LocationHours` records cover current day/time.
- Reservation alternatives empty -> check `ReservationPolicy` buffers and confirm data seeded.
- Build failures citing Edge runtime -> confirm server-only utilities stay within `(transactions)` routes.


## Appendix

### Quickstart Verification (2025-10-05)
- `npm run seed:content` -> completed successfully (`Seeding Restoran Kiisi content...`, `Seed complete`).
- `npm run dev` -> Next.js 15.5.4 Turbopack dev server booted on http://localhost:3001; instrumentation compilation began without errors. Process stopped after startup verification.

