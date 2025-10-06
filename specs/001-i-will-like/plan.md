# Implementation Plan: Restoran Kiisi Web Experience

**Branch**: `001-i-will-like` | **Date**: 2025-10-04 | **Spec**: C:\Users\fredi\new\3\specs\001-i-will-like\spec.md
**Input**: C:\Users\fredi\new\3\specs\001-i-will-like\spec.md

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   -> If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   -> Detect project type from repository structure (single/web/mobile)
   -> Set Structure Decision based on project type
3. Populate the Constitution Check section using the current constitution
4. Evaluate Constitution Check
   -> If violations exist: Document in Complexity Tracking
   -> If no justification possible: ERROR "Simplify approach first"
   -> Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 -> produce research.md
   -> If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 -> produce contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md`, `.github/copilot-instructions.md`, `GEMINI.md`, `QWEN.md`, or `AGENTS.md`)
7. Re-evaluate Constitution Check
   -> If new violations: Refactor design, return to Phase 1
   -> Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 -> describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Restoran Kiisi needs a fully branded Next.js 15 experience that unifies menu browsing, first-party ordering (with pay-on-site settlement), table reservations, and multi-location discovery while exposing secondary offerings (offers, catering, careers). The solution must stream marketing content quickly, deliver transactional flows with Server Actions, and provide an authenticated account area with Kiisi-managed email/password credentials.

## Technical Context
**Language/Version**: TypeScript 5.x, Node.js 20 (Next.js 15 requirement)
**Primary Dependencies**: Next.js 15.5.4, React 19.1, Tailwind CSS 4, NextAuth (credentials provider), Prisma ORM
**Storage**: PlanetScale (MySQL, EU region) for menu/location/reservation/account data (approved); no Redis dependency in MVP (cache via revalidateTag)
**Testing**: next/test + Testing Library for RSC/client coverage, Playwright for end-to-end flows, Vitest for utility layers
**Target Platform**: Vercel Edge for marketing routes, Vercel Node runtime for transactional Server Actions
**Project Type**: single (Next.js App Router)
**Performance Goals**: TTFB <=200ms prerendered, <=300ms transactional; LCP <=2.5s key routes; interaction-ready <=100ms tab changes
**Constraints**: Must comply with Kiisi brand, support multi-location data, enforce service-hour gating, avoid third-party white-label order flows, and hit uptime SLO 99.5% monthly with 30-minute incident acknowledgement
**Scale/Scope**: Launch with 5 pilot locations, ~200 menu items, expected peak 200 concurrent web sessions during dinner service (confirmed by operations)
**Rendering Intent**: Home/menu/locations/offers partially prerendered with streaming; order/reserve/account dynamic (server actions) with Suspense boundaries; account uses edge-compatible auth handshake but runs Server Actions for mutations
**Caching Strategy**: Static content revalidates every 24h with tag-based invalidation per MenuCategory/Promotion/Location updates; transactional responses skip cache but emit invalidation tags for order/reserve/account states; feature flags/service hours fetched from PlanetScale tables with no external cache for MVP
**Performance Budgets**: Build profile budgets baseline from next build --turbopack --profile; ensure no route exceeds 200kb streamed payload initial chunk; streaming skeleton within 100ms
**Edge & Observability**: instrumentation.ts spans for nav interactions, order/reserve funnels, auth; structured logging via Logflare; per-route preferredRegion with fallback to `iad1`; error.tsx/not-found.tsx customized with support contact, correlation IDs; uptime SLI exported via custom metric (availability ratio)

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- App Router adoption confirmed; no Pages Router usage planned.
- Server Actions own ordering/reservation/auth mutations with documented cache metadata.
- Rendering intents & partial prerendering budgets align with constitution thresholds (TTFB/LCP noted above).
- Edge runtime + instrumentation hooks defined; error/not-found pages part of scope.
- Automated tests planned: contract tests for server actions, streaming fallbacks, and Playwright flows before implementation.

## Project Structure

### Documentation (this feature)
```
specs/001-i-will-like/
|-- plan.md              # This file (/plan command output)
|-- research.md          # Phase 0 output (/plan command)
|-- data-model.md        # Phase 1 output (/plan command)
|-- quickstart.md        # Phase 1 output (/plan command)
|-- contracts/           # Phase 1 output (/plan command)
|   |-- ordering.md
|   |-- reservations.md
|   |-- navigation.json
|-- tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/
|-- app/
|   |-- (marketing)/
|   |   |-- layout.tsx
|   |   |-- page.tsx              # homepage
|   |   |-- menu/
|   |   |   |-- page.tsx
|   |   |   |-- layout.tsx
|   |   |   |-- loading.tsx
|   |   |   |-- error.tsx
|   |   |-- offers/
|   |   |-- locations/
|   |   |   |-- [location]/page.tsx
|   |   |   |-- layout.tsx
|   |   |-- contact/page.tsx
|   |-- (transactions)/
|   |   |-- order/
|   |   |   |-- page.tsx
|   |   |   |-- actions.ts
|   |   |   |-- layout.tsx
|   |   |   |-- loading.tsx
|   |   |-- reserve/
|   |   |   |-- page.tsx
|   |   |   |-- actions.ts
|   |   |-- account/
|   |   |   |-- page.tsx
|   |   |   |-- layout.tsx
|   |   |   |-- loading.tsx
|   |-- api/
|       |-- availability/route.ts
|       |-- auth/
|           |-- route.ts
|-- lib/
|   |-- data/
|   |-- auth/
|   |-- observability/
|-- components/
|   |-- navigation/
|   |-- menu/
|   |-- cards/

instrumentation.ts

scripts/
|-- seed-menu.ts

tests/
|-- contract/
|   |-- order-actions.test.ts
|   |-- reserve-actions.test.ts
|-- integration/
|   |-- order-flow.spec.ts
|   |-- reserve-flow.spec.ts
|-- components/
|   |-- navigation-bar.test.tsx
|-- performance/
|   |-- homepage.lh.config.ts
```

**Structure Decision**: Single Next.js 15 project with segmented routes for marketing vs transactional flows; shared lib layer hosts caching/auth utilities; tests mirror feature areas per constitution.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - Import operations-provided service hours and reservation policy dataset into PlanetScale (Ops)
   - Capture finalized business hours & reservation policies per location in schema seeds (Operations)
   - Configure order confirmation templates reflecting pay-on-site settlement (Operations + Marketing)
   - Implement marketing-owned content workflow (Prisma seeds maintained via Git)
   - Document finalized uptime SLO (99.5%) and incident escalation playbook in ops runbook (Leadership)

2. **Generate and dispatch research agents**:
   ```
   Task: "Load operations hours/reservations spreadsheet into PlanetScale tables" (Infra)
   Task: "Author content seeding process for marketing-owned data" (Marketing)
   Task: "Update order confirmation copy to emphasize pay-on-site" (Marketing)
   Task: "Publish uptime SLO + escalation appendix" (Leadership)
   Task: "Confirm invoice-by-email flow with finance" (Finance)
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved (flag outstanding items otherwise).

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** -> `data-model.md`:
   - Capture MenuCategory/MenuItem relationships, Promotion targeting, RestaurantLocation metadata, OrderSession + ReservationRequest lifecycle, GuestProfile auth state
   - Define uniqueness (e.g., MenuItem slug), caching tags, and state transitions

2. **Generate API contracts or server action interfaces** from functional requirements:
   - Document server action signatures for `createOrder`, `checkAvailability`, `createReservation`, `updateProfile`, `authenticateUser`
   - Describe route handler schema for availability lookup + auth handshake
   - Record caching metadata (tags, revalidate) per action in contracts

3. **Generate contract tests** from contracts:
   - Write failing tests describing expected payloads + cache headers for each server action and API route
   - Include partial prerender streaming assertions for marketing routes (component tests for skeleton behaviour)

4. **Extract test scenarios** from user stories:
   - Map acceptance criteria to integration tests (menu browsing, order happy path, reservation fallback, account login)
   - Document performance checks referencing budgets (Playwright + custom metrics)

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex`
   - Append new tech stack entries (PlanetScale, NextAuth credentials, Prisma) under appropriate sections

**Output**: data-model.md, contracts/, quickstart.md, and updated agent context with failing contract tests planned.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Convert research + design artifacts into task lists covering:
  - Infrastructure setup (PlanetScale schema, service-hour seeds)
  - Route scaffolding with App Router segments + Suspense boundaries
  - Server Actions + tests for order/reservation/account flows
  - Observability wiring (instrumentation.ts spans, logging)
  - Accessibility + responsive QA tasks

**Ordering Strategy**:
- TDD: contract tests (server actions, navigation) before implementation
- Build data layer entities (Prisma schema) before UI consumption
- Schedule Observability + performance validation before launch readiness sign-off
- Mark independent tasks [P] when they touch disjoint files (e.g., tests/contract vs tests/integration)

**Estimated Output**: 28-32 ordered tasks across setup, tests, implementation, resilience, polish.

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*


