# Tasks: Restoran Kiisi Web Experience

**Input**: C:\Users\fredi\new\3\specs\001-i-will-like\spec.md
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   -> If not found: ERROR "No implementation plan found"
   -> Extract: tech stack, libraries, structure, rendering/caching guardrails
2. Load design documents:
   -> data-model.md: Extract entities -> model tasks
   -> contracts/: Each file -> contract test task
   -> research.md: Extract decisions -> setup/integration tasks
   -> quickstart.md: Extract environment + verification steps
3. Generate tasks by category:
   -> Setup: environment variables, dependencies, schema baseline
   -> Tests: contract, integration, component coverage
   -> Core: Prisma models, seeds, Server Actions, App Router routes
   -> Integration: observability, notifications, SLO wiring
   -> Polish: QA, docs, performance checks
4. Apply task rules:
   -> Different files = mark [P] for parallel
   -> Same file = sequential (no [P])
   -> Tests before implementation (TDD)
   -> Document guardrail coverage in descriptions
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph + parallel guidance
7. Validate completeness: entities, contracts, user journeys, guardrails covered
8. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- App Router segments live in `src/app/(marketing)` and `src/app/(transactions)`
- Server Actions under `src/app/(transactions)/*/actions.ts`
- Prisma schema in `prisma/schema.prisma`
- Seeds under `scripts/`
- Tests in `tests/{contract|integration|components}`

## Phase 3.1: Setup
- [X] T001 Update `.env.example` with PlanetScale, SendGrid, and `ORDER_PAYMENT_MODE_DEFAULT` variables per quickstart guidance.
- [X] T002 Ensure `package.json` lists Prisma, @prisma/client, NextAuth credentials provider, and PlanetScale client versions aligned with plan constraints.
- [X] T003 Scaffold base Prisma configuration (`prisma/schema.prisma`, generator, datasource) pointing at PlanetScale EU branch.

## Phase 3.2: Tests First (TDD)
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [X] T004 [P] Create `tests/contract/order-actions.test.ts` covering `createOrder` closed-hours rejection and pay-on-site instruction payload.
- [X] T005 [P] Create `tests/contract/reserve-actions.test.ts` covering `checkAvailability` party-size enforcement and nearest-slot fallback.
- [X] T006 [P] Author Playwright flow `tests/integration/order-flow.spec.ts` for pay-on-site happy path plus invoice-by-email branch.
- [X] T007 [P] Author Playwright flow `tests/integration/reserve-flow.spec.ts` validating unavailable-slot messaging and fallback selection.
- [X] T008 [P] Author Playwright flow `tests/integration/account-auth.spec.ts` for credentials login, profile update, and logout.
- [X] T009 [P] Create Testing Library suite `tests/components/navigation-bar.test.tsx` asserting primary/secondary/mobile navigation rendering.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [X] T010 Define Prisma models for MenuCategory, MenuItem, Promotion, NavigationLink in `prisma/schema.prisma` with relations and enums.
- [X] T011 Extend `prisma/schema.prisma` with RestaurantLocation, LocationHours, ReservationPolicy entities and relational constraints.
- [X] T012 Add OrderSession, ReservationRequest, GuestProfile models (with paymentMode, invoice fields) and run `npx prisma db push`.
- [X] T013 Implement content seed script `scripts/seed-content.ts` to populate menu, navigation, promotions from Git-managed data.
- [X] T014 Extend `scripts/seed-content.ts` to ingest operations service hours/reservation policies and wire `npm run seed:content` command.
- [X] T015 Implement data fetchers in `src/lib/data/` for menu, promotions, locations, service hours, reservation policy, and navigation links.
- [X] T016 Scaffold `(marketing)` layout, shared Header/Footer, and Suspense boundaries in `src/app/(marketing)/layout.tsx` + `src/components/navigation/*`.
- [X] T017 Build marketing pages (`src/app/(marketing)/page.tsx`, `menu/page.tsx`, `offers/page.tsx`, `contact/page.tsx`) with streaming skeletons and data loaders.
- [X] T018 Implement location detail route `src/app/(marketing)/locations/[slug]/page.tsx` with map embed and hours listing.
- [X] T019 Scaffold order experience shell in `src/app/(transactions)/order/page.tsx` including form state, service-hour messaging, and Suspense boundaries.
- [X] T020 Implement `createOrder` Server Action plus helpers in `src/app/(transactions)/order/actions.ts` (pay-on-site + invoice email path).
- [X] T021 Build reservation UI flow in `src/app/(transactions)/reserve/page.tsx` including slot picker and nearest-slot fallback messaging.
- [X] T022 Implement reservation Server Actions (`checkAvailability`, `createReservation`, `cancelReservation`) in `src/app/(transactions)/reserve/actions.ts`.
- [X] T023 Implement account dashboard route in `src/app/(transactions)/account/page.tsx` with profile form and recent activity view.
- [X] T024 Configure NextAuth credentials provider in `src/app/api/auth/[...nextauth]/route.ts` and supporting options in `src/lib/auth/options.ts`.
- [X] T025 Implement availability API handler `src/app/api/availability/route.ts` returning `AvailabilitySlot` data for client polling.
- [X] T026 Add order notification templates (confirmation + invoice) in `src/lib/notifications/order.ts` with SendGrid integration.
- [X] T027 Add reservation notification templates (confirmation + waitlist with ICS) in `src/lib/notifications/reservations.ts`.
- [X] T028 Wire instrumentation spans and availability SLI exporter in `instrumentation.ts` and `src/lib/observability/slo.ts`.
- [X] T029 Update `package.json` scripts (`seed:content`, `revalidate:hours`) and document usage in Quickstart.

## Phase 3.4: Integration
- [X] T030 Implement SLA/escalation docs in `docs/ops-runbook.md` capturing 99.5% SLO, acknowledgement targets, and alert thresholds.
- [X] T031 Hook order confirmation copy to emphasize pay-on-site vs invoice in `src/app/(transactions)/order/page.tsx` and emails.
- [X] T032 Create finance handoff logic for invoice-by-email (queue record) in `src/lib/workflows/invoice.ts` and surface status in account view.

## Phase 3.5: Polish
- [X] T033 [P] Verify Quickstart by running `npm run seed:content`, `npm run dev`, and documenting outcomes in `specs/001-i-will-like/quickstart.md` appendix.
- [X] T034 [P] Run `npm run lint`, `npm run test`, `npm run test:e2e` and capture results in `docs/qa/order-reserve.md`.
- [X] T035 [P] Capture `npm run build -- --profile` metrics and Lighthouse smoke (`npm run test:lh`) storing reports under `docs/perf/`.
- [X] T036 [P] Conduct accessibility sweep for navigation/order/reserve flows, log fixes and confirmations in `docs/qa/accessibility.md`.

## Dependencies
- T004-T009 depend on setup tasks T001-T003.
- Schema tasks T010-T012 precede seeds (T013-T014) and all Server Actions/UI tasks.
- Server Actions T020, T022 require corresponding Prisma models and data fetchers (T010-T015).
- Notification tasks T026-T027 depend on Server Actions and SendGrid env setup.
- Observability task T028 depends on Server Actions to instrument spans.
- Integration docs/workflows (T030-T032) depend on core implementation tasks.
- Polish tasks (T033-T036) require preceding implementation and tests to be complete.

## Parallel Example
```
# After completing T004 prerequisites, run these [P] tasks together:
/specs/001-i-will-like> task T004
/specs/001-i-will-like> task T005
/specs/001-i-will-like> task T006
/specs/001-i-will-like> task T007
```












