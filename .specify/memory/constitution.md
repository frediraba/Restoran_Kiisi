<!--
Sync Impact Report:
- Version change: n/a -> 1.0.0
- Modified principles: n/a (initial set)
- Added sections: Core Principles, Framework Guardrails, Delivery Workflow, Governance
- Removed sections: none
- Templates requiring updates (updated/pending):
  - updated .specify/templates/plan-template.md
- Follow-up TODOs: none
-->

# Next.js 15 Starter Constitution

## Core Principles

### App Router First Delivery
- MUST build all user-facing routes with the Next.js App Router; introducing the legacy Pages Router requires governance approval.
- MUST default to React Server Components; mark Client Components only when browser-only APIs or shared mutable state demand it, and confine them to leaf segments.
- MUST define layout.tsx, loading.tsx, template.tsx, and error.tsx per route segment so streaming is the default and shared UI is centralized.
Rationale: Aligns the project with Next.js 15's server-centric pipeline, shrinking bundles and giving the framework maximum control over caching and streaming.

### Server Actions Own Mutations
- MUST implement data mutations with scoped Server Actions (or route handlers when integration protocols demand) to guarantee server-only execution, type safety, and CSRF protection.
- MUST colocate data fetching at the route, layout, or loader boundary and configure caching via fetch options (cache, revalidate, next) with tag-based revalidation for downstream invalidation plans.
- MUST model loading and optimistic states with Suspense boundaries and transitions rather than imperative client fetches.
Rationale: Keeps data flow predictable, leverages Next.js 15 cache primitives, and prevents client drift.

### Measured Rendering & Caching Budgets
- MUST declare rendering intent (dynamic, revalidate, preferredRegion, runtime) for every route and record it in the plan so performance budgets are reviewable.
- MUST apply Partial Prerendering for hybrid routes when static data exists, using loading.tsx/Suspense to keep the shell interactive within 100ms and enforce TTFB <=200ms and LCP <=2.5s for critical paths.
- MUST profile next build --turbopack --profile during CI; regressions over 10% require remediation before release.
Rationale: Makes performance measurable and enforces proactive cache and rendering choices.

### Edge Observability & Resilience
- SHOULD prefer the Edge Runtime for latency-sensitive handlers and document preferredRegion/fallback regions for each route.
- MUST provide instrumentation.ts tracing for critical flows, emit structured logs, and surface metrics to the observability stack before shipping.
- MUST ship resilient UX by implementing error.tsx, not-found.tsx, and user-friendly fallbacks for failed server actions, logging correlation IDs for triage.
Rationale: Keeps the application debuggable in distributed environments and limits the blast radius of faults.

### Type-Safe Testing & Automation
- MUST keep TypeScript strict mode enabled, enforce ESLint/Next linting, and treat lint errors as build blockers.
- MUST cover Server Actions, routing, and rendering contracts with automated tests (next/test, Playwright, and Testing Library) that run in CI before merge.
- MUST gate deployments on npm run build and representative smoke tests; untested runtime flags or experiments require feature toggles with rollback plans.
Rationale: Preserves correctness as the codebase evolves and ensures DX tooling remains trustworthy.

## Framework Guardrails
- Runtime stack is Next.js 15.5 with React 19 and Turbopack; dependency upgrades must document compatibility risks and mitigations.
- Styling defaults to Tailwind CSS v4 utilities or scoped CSS Modules; new global stylesheets require review and justification.
- Fonts must use next/font (or a governance-approved alternative) to preserve automatic subsetting and privacy controls.
- Environment secrets flow through typed runtime configuration (process.env with validation) and never leak to client bundles.

## Delivery Workflow
- Every feature begins with the /spec template, explicitly listing rendering intent, caching strategy, and performance budgets derived from this constitution.
- The /plan output must include an initial and post-design Constitution Check verifying App Router usage, server-component boundaries, and test coverage plans.
- Implementation follows TDD: commit failing tests for server actions/routes first, then ship features that satisfy lint/build gates and the declared budgets.
- Any deviation (e.g., client-side data fetching, skipping Suspense) must be documented in plan.md Complexity Tracking with a mitigation timeline.

## Governance
- This constitution supersedes other coding practices; code review must confirm compliance before merge.
- Amendments require a written RFC, maintainer approval, updates to dependent templates, and version bump rationale recorded in this document.
- Versioning follows SemVer for governance (MAJOR incompatible rule changes, MINOR new principles/sections, PATCH clarifications); Last Amended reflects the publish date.
- Compliance is validated at spec/plan review, automated lint/build/test gates, and pre-release checklists; violations block release unless formally waived.

**Version**: 1.0.0 | **Ratified**: 2025-10-04 | **Last Amended**: 2025-10-04
