# Tasks: Deploy Project to Vercel

**Input**: Design documents from `specs/002-i-want-to/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Phase 3.1: Setup
- [X] T001 Create deployment runbook skeleton in `docs/deployment/vercel.md` summarizing Hobby prerequisites and linking to spec clarifications.
- [X] T002 [P] Document manual rollback procedure in `docs/operations/vercel-rollback.md` based on FR-005.

## Phase 3.2: Tests First (TDD)
- [X] T003 [P] Add failing unit test in `tests/unit/config/vercel-config.test.ts` asserting the required environment variable metadata exists.
- [X] T004 [P] Add failing unit test in `tests/unit/config/deployment-configuration.test.ts` verifying branch, region, and plan settings are exported.

## Phase 3.3: Core Implementation
- [X] T005 Implement `src/lib/config/vercel.ts` to expose environment variable descriptors that satisfy T003.
- [X] T006 Update `src/lib/config/index.ts` to export the Vercel deployment configuration for consumers (unblocks T004).
- [X] T007 Create CLI guard script `scripts/vercel/ensure-env.ts` that validates required secrets via `src/lib/config/vercel.ts`.

## Phase 3.4: Integration
- [X] T008 Add `check:vercel-env` npm script to `package.json` invoking `tsx scripts/vercel/ensure-env.ts` and document failure signals.
- [X] T009 Update `docs/deployment/vercel.md` with instructions for running `npm run check:vercel-env` and interpreting results.
- [X] T010 Extend `docs/deployment/vercel.md` with step-by-step Vercel CLI commands (`vercel link`, `vercel env add ...`) and dashboard validation notes.
- [X] T011 Record dashboard-only validation checklist in `docs/operations/vercel-rollback.md`, including manual redeploy steps and status logging.

## Phase 3.5: Polish
- [X] T012 Update `README.md` deployment section to reference `docs/deployment/vercel.md` and `docs/operations/vercel-rollback.md`.
- [X] T013 Run `npm run lint` and `npm test` to confirm new configuration tests pass before requesting deployment.

## Dependencies
- T003 ? T005
- T004 ? T006
- T005 ? T006 ? T007 ? T008
- T001 ? T009, T010
- T002 ? T011
- T007 ? T008 ? T009, T010
- T009, T010, T011 ? T012
- T005, T006, T007 ? T013

## Parallel Execution Example
```
# After completing setup (T001-T002), create the failing tests in parallel:
Task: T003 Add failing unit test in tests/unit/config/vercel-config.test.ts
Task: T004 Add failing unit test in tests/unit/config/deployment-configuration.test.ts
```

## Notes
- Maintain TDD: ensure T003 and T004 fail before implementing T005-T007.
- Use `npm run check:vercel-env` locally before configuring Vercel to catch missing secrets early.
- Document manual deployment validation in docs to preserve single-maintainer workflow expectations.
