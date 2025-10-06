# Operations Runbook – Restoran Kiisi Web Experience

## Service Level Objectives
- **Availability SLO**: 99.5% uptime measured monthly for `/`, `/menu`, `/order`, `/reserve`, `/account`.
- **Acknowledgement target**: Incidents acknowledged within 30 minutes during service hours (10:00–22:00 EE time).
- **Resolution target**: Critical issues resolved within 4 hours or workaround communicated.

## Monitoring & Alerting
- Vercel uptime checks + custom availability metrics exported via `restoran_kiisi_availability_*` counters.
- Pager rotation: Operations primary, Engineering secondary. Escalate via Slack `#restoran-ops`.

## Incident Workflow
1. **Detect**: Alert fired (PagerDuty) or manual report.
2. **Acknowledge**: Ops on-call within 30 minutes; log in incident tracker.
3. **Mitigate**: Apply workaround (e.g., disable order intake) or rollback latest deployment.
4. **Communicate**: Update status page + Slack channel every 30 minutes.
5. **Resolve**: Restore service, confirm availability metric recovered.
6. **Postmortem**: Within 48 hours, document root cause and preventative actions.

## Runbooks
- **Order service degraded**: Toggle `ORDER_FORCE_CLOSED` via environment flag, notify front-of-house, initiate catering fallback.
- **Reservation availability mismatch**: Re-run `npm run revalidate:hours`, verify PlanetScale `LocationHours` data, and trigger redeploy.
- **Auth failures**: Confirm NextAuth secrets, validate PlanetScale connectivity, rotate pepper if compromised.

