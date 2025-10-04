# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   -> If not found: ERROR "No implementation plan found"
   -> Extract: tech stack, libraries, structure, rendering/caching guardrails
2. Load optional design documents:
   -> data-model.md: Extract entities -> model tasks
   -> contracts/: Each file -> contract test task
   -> research.md: Extract decisions -> setup tasks
3. Generate tasks by category:
   -> Setup: project scaffolding, environment, instrumentation.ts updates
   -> Tests: server action/route handler contracts, component integration, accessibility budgets
   -> Core: server components, server actions, shared utilities
   -> Resilience: caching tags, error boundaries, observability wiring
   -> Polish: performance verification, documentation, cleanup
4. Apply task rules:
   -> Different files = mark [P] for parallel
   -> Same file = sequential (no [P])
   -> Tests before implementation (TDD)
   -> Document guardrail coverage (rendering intent, caching, performance budgets) in task descriptions
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   -> All contracts have tests?
   -> All entities have models?
   -> Rendering/caching/observability guardrails translated into tasks?
   -> All endpoints or server actions implemented?
   -> Performance budgets have validation tasks?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- Routes/components: `src/app/` (App Router segments, layouts, pages)
- Shared utilities: `src/lib/`
- Server actions and route handlers: colocate in segment directories or `src/app/api/`
- Tests live in `tests/` mirroring feature structure (`tests/contract`, `tests/integration`, `tests/components`)

## Phase 3.1: Setup
- [ ] T001 Create feature route segment directory in `src/app/[feature]/`
- [ ] T002 Scaffold `layout.tsx`, `page.tsx`, and placeholder `loading.tsx`
- [ ] T003 [P] Register feature-specific tracing in `instrumentation.ts` and document `preferredRegion`

## Phase 3.2: Tests First (TDD) - MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Write route handler contract test in `tests/contract/[feature].contract.spec.ts`
- [ ] T005 [P] Write server action unit test in `tests/actions/[feature].actions.spec.ts`
- [ ] T006 [P] Write component integration test with `@testing-library/react` in `tests/integration/[feature].render.spec.tsx`
- [ ] T007 Define performance budget assertions (TTFB, LCP) in `tests/performance/[feature].budget.spec.ts`

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T008 [P] Implement server action(s) in `src/app/[feature]/actions.ts`
- [ ] T009 [P] Implement route handler(s) in `src/app/api/[feature]/route.ts`
- [ ] T010 Build page/server components in `src/app/[feature]/page.tsx`
- [ ] T011 Wire suspense boundaries and optimistic UI states
- [ ] T012 Implement data fetching with configured caching tags and revalidation

## Phase 3.4: Resilience & Observability
- [ ] T013 Update `error.tsx` and `not-found.tsx` fallbacks for the feature
- [ ] T014 Emit structured logs and metrics for critical paths
- [ ] T015 Validate `instrumentation.ts` spans and ensure edge runtime config aligns with plan

## Phase 3.5: Polish
- [ ] T016 [P] Run `npm run lint` and address issues
- [ ] T017 Execute automated tests (`npm run test` or equivalent) and ensure budgets hold
- [ ] T018 [P] Update documentation (spec appendix, changelog, README excerpt)
- [ ] T019 Final accessibility pass (keyboard navigation, aria attributes)
- [ ] T020 Confirm rollback/feature flag plan documented

## Dependencies
- Tests (T004-T007) before implementation (T008-T012)
- T008 blocks T009-T012
- T013 depends on completed implementation work
- Observability tasks (T014-T015) block deployment readiness

## Parallel Example
```
# Launch guardrail-focused tests together:
Task: "Route handler contract test in tests/contract/[feature].contract.spec.ts"
Task: "Server action unit test in tests/actions/[feature].actions.spec.ts"
Task: "Component integration test in tests/integration/[feature].render.spec.tsx"
Task: "Performance budget assertions in tests/performance/[feature].budget.spec.ts"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Keep guardrail documentation (rendering, caching, observability) alongside tasks

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file -> contract test task [P]
   - Each endpoint or server action -> implementation task
  
2. **From Data Model**:
   - Each entity -> model or data-mapping task [P]
   - Relationships -> validation or serialization tasks
  
3. **From User Stories**:
   - Each story -> integration test [P]
   - Quickstart scenarios -> validation tasks

4. **Guardrails**:
   - Rendering intent -> suspense/loading/error boundary tasks
   - Caching strategy -> tag/revalidation tasks plus invalidation tests
   - Performance budgets -> monitoring or synthetic test tasks
   - Edge & observability -> instrumentation.ts, logging, alerting tasks

5. **Ordering**:
   - Setup -> Tests -> Implementation -> Resilience -> Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] Guardrail coverage (rendering, caching, observability, performance budgets) present
- [ ] No task modifies same file as another [P] task


