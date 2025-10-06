# QA Run Log - Order & Reserve Flows

**Timestamp**: 2025-10-05 09:15 +03:00

| Command | Result | Notes |
| --- | --- | --- |
| `npm run lint` | Pass | ESLint completed without reported warnings or errors. |
| `npm run test` | Fail | Vitest run finished with 3 failing suites: contract `createOrder` rejects seeded items as unavailable, invoice path blocked by closed hours, and `NavigationBar` test throws "React is not defined"; Playwright-style specs under `tests/integration` also error when executed under Vitest. |
| `npm run test:e2e` | Fail / Timeout | Playwright web server crashed citing Next.js "use server" export violations in order/account pages and missing `metrics` export in `src/lib/observability/slo.ts`; UI interactions timed out waiting for combobox options. |

## Failure Details
- `tests/contract/order-actions.test.ts`: Order fixtures report "One or more menu items are unavailable" and "Service closed for selected time".
- `tests/components/navigation-bar.test.tsx`: Test environment lacks automatic JSX runtime import; `React` reference undefined.
- Playwright specs: Integration tests rely on server actions exporting objects; Next.js loader requires async server functions; also missing instrumentation exports and form controls not rendered, leading to locator timeouts.

## Next Actions
1. Reconcile seed data and service-hour logic so contract tests receive available menu items and open hours.
2. Update component tests to use automatic JSX runtime or import React explicitly.
3. Audit Server Action modules to ensure only async functions are exported and observability helpers match `@vercel/otel` APIs; rerun Playwright suite after fixes.

