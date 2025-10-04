# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

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
[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context
**Language/Version**: [e.g., TypeScript 5.x, Node.js 20, NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., Next.js 15.5, React 19, Tailwind 4 or NEEDS CLARIFICATION]  
**Storage**: [e.g., PlanetScale, Supabase, filesystem, or N/A]  
**Testing**: [e.g., next/test, Playwright, Vitest or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Vercel Edge, Node server, browser targets or NEEDS CLARIFICATION]  
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., TTFB <=200ms, LCP <=2.5s, FID <=50ms or NEEDS CLARIFICATION]  
**Constraints**: [e.g., p95 latency, memory caps, offline support or NEEDS CLARIFICATION]  
**Scale/Scope**: [e.g., daily active users, routes affected, release cadence or NEEDS CLARIFICATION]  
**Rendering Intent**: [per route: static, dynamic, partial prerendering, edge or NEEDS CLARIFICATION]  
**Caching Strategy**: [revalidation windows, tag usage, invalidation plan or NEEDS CLARIFICATION]  
**Performance Budgets**: [TTFB, LCP, RUM metrics or NEEDS CLARIFICATION]  
**Edge & Observability**: [edge runtime usage, instrumentation.ts hooks, fallback UX or NEEDS CLARIFICATION]

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- App Router + Server Components plan confirmed; legacy Pages Router usage recorded with waiver.
- Data fetching uses Server Actions or route handlers with caching metadata and invalidation tags documented.
- Rendering intent, Partial Prerendering usage, and stated budgets align with performance targets.
- Edge runtime coverage, instrumentation.ts hooks, and error/not-found fallbacks are defined.
- Automated tests cover server actions, routing, and streaming fallbacks before implementation.

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
|-- plan.md              # This file (/plan command output)
|-- research.md          # Phase 0 output (/plan command)
|-- data-model.md        # Phase 1 output (/plan command)
|-- quickstart.md        # Phase 1 output (/plan command)
|-- contracts/           # Phase 1 output (/plan command)
|-- tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
|-- app/
|   |-- [feature]/
|       |-- page.tsx
|       |-- layout.tsx
|       |-- loading.tsx
|       |-- error.tsx
|-- lib/
|-- components/

tests/
|-- contract/
|-- integration/
|-- components/
|-- performance/

# Option 2: Web application (frontend + backend)
backend/
|-- src/
|-- tests/

frontend/
|-- src/
|-- tests/

# Option 3: Mobile + API
api/
|-- src/
|-- tests/

mobile/ (ios/ or android/)
|-- src/
|-- tests/
```

**Structure Decision**: [Document the selected structure and reference the real directories captured above]

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION -> create research task
   - For each dependency -> gather best practices
   - For each integration -> document patterns and risks

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** -> `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts or server action interfaces** from functional requirements:
   - For each user action -> endpoint or server action definition
   - Capture input/output schemas, caching tags, and revalidation expectations
   - Output OpenAPI definitions or TypeScript interfaces to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint/server action
   - Assert request/response schemas and cache metadata
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story -> integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract/server action -> contract test task [P]
- Each entity -> model creation or data-mapping task [P]
- Each user story -> integration test task
- Implementation tasks to make tests pass
- Guardrail tasks: rendering intent, caching tags, performance budgets, observability

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

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
| [e.g., client-side data fetch] | [current need] | [why server action insufficient] |
| [e.g., bypassing Suspense] | [specific problem] | [why standard pattern insufficient] |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*
