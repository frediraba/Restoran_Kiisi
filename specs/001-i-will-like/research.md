# Phase 0 Research - Restoran Kiisi Web Experience

## Decision Log

### App Router Segmentation
- **Decision**: Maintain two route groups `(marketing)` for static/partial prerender pages and `(transactions)` for dynamic flows.
- **Rationale**: Aligns layout boundaries with caching strategy and streaming requirements while keeping constitution-compliant simplicity.
- **Alternatives Considered**: Single flat route tree (harder to isolate Suspense boundaries); multiple Next projects (adds operational overhead).

### Data Persistence Strategy
- **Decision**: Use PlanetScale (MySQL, EU region) via Prisma for menu, location, reservation, service-hour, and account profile data.
- **Rationale**: PlanetScale provides schema branching, regional reads, and Prisma integration; approved by infrastructure.
- **Alternatives Considered**: PostgreSQL (higher migration cost), headless CMS only (insufficient for transactional state).

### Availability & Scheduling Source of Truth
- **Decision**: Operations-provided spreadsheet of opening hours, reservation buffers, and max party sizes will be ingested into PlanetScale tables (`LocationHours`, `ReservationPolicy`).
- **Rationale**: Centralizes gating logic alongside transactional data and keeps service-hour changes auditable.
- **Alternatives Considered**: Redis snapshot cache (deferred to post-MVP), manual JSON configuration (error prone).

### Content Workflow
- **Decision**: Marketing owns menu, promotion, and navigation content via Prisma seed scripts stored in the repo; updates flow through Git review.
- **Rationale**: Avoids standing up a CMS for MVP while keeping version control and preview environments simple.
- **Alternatives Considered**: Sanity CMS (longer setup), Google Sheets import (fragile with binary assets).

### Authentication & Payments
- **Decision**: Provide Kiisi-managed email/password login with NextAuth credentials provider; no online payments in MVP. Orders instruct guests to pay on-site (card/cash) or request invoice by email.
- **Rationale**: Meets clarified requirement while minimizing PCI scope.
- **Alternatives Considered**: OAuth/Social login (not required), online card capture (deferred pending processor selection).

### Observability & Reliability
- **Decision**: Emit traces via instrumentation.ts to Vercel Observability and structured logs to Logflare; track availability SLI and hold monthly SLO of 99.5% uptime with 30-minute acknowledgement target. Reservation contact data retained 90 days in compliance with EU guidance.
- **Alternatives Considered**: Third-party APM (post-MVP), longer retention (raises legal scrutiny).

## Closed Follow-Ups (2025-10-04)
- PlanetScale approval confirmed; Upstash Redis deferred to post-MVP.
- Operations finalized business hours, reservation buffers, and max party sizes per location.
- Marketing confirmed Git-based seed workflow for content; training scheduled.
- Leadership ratified SLO and escalation matrix.

## Current Actions
1. Import operations spreadsheet into PlanetScale tables and expose Prisma models.
2. Generate initial seed scripts for hours, reservation policy, navigation, and menu content.
3. Update order confirmation emails to emphasize on-site payment or invoice request.
4. Document SLO metric calculations and alert thresholds in ops runbook.
5. Align finance process for invoice-by-email workflow (no payment processor integration required).

## Assumptions (validated)
- Peak demand: ~200 concurrent sessions with ability to burst to 400 for short periods.
- Menu taxonomy shared across locations; price overrides handled in data model.
- SendGrid remains available for transactional email (auth + reservations + invoice notices).

## Risks
- Future adoption of Redis/feature flags will require revisiting caching strategy (track in backlog).
- Manual seed workflow relies on marketing discipline—automation for back-office UI should be prioritized post-MVP.
- Pay-on-site messaging must be prominent to avoid customer confusion; QA to verify copy across device sizes.

