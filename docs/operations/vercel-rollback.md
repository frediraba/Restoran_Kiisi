# Vercel Rollback Playbook (Hobby Plan)

This document operationalizes FR-005 from `specs/002-i-want-to/spec.md`: manual rollback is executed by redeploying a previously successful build from the Vercel dashboard.

## When to Trigger a Rollback
- Production deployment shows `Error` or `Failed` status.
- Critical regression detected during personal validation of the dashboard URL.
- Environment secret rotated incorrectly, breaking authentication or database access.

## Preparation Checklist
- Confirm the last known-good deployment in the Vercel dashboard (`Deployments` tab).
- Ensure current `main` branch head contains or references the good commit (no force pushes).
- Notify stakeholders (if any) that the application may serve stale content until redeploy completes.

## Rollback Procedure
1. Open the Vercel project dashboard.
2. Navigate to **Deployments** and locate the last `Ready` deployment you trust.
3. Click the deployment entry, then choose **Redeploy**.
4. Confirm the redeploy action; Vercel will rebuild using the same commit and environment settings.
5. Monitor the redeploy logs until status returns to `Ready`.
6. Validate the production URL manually (per Quickstart checklist) before announcing recovery.

## Validation Checklist
- Watch the **Deployments** feed until the redeployed build returns to `Ready`.
- Use the dashboard **Visit** button to manually verify key flows (`/`, `/menu`, `/order`).
- Capture the dashboard status (timestamp + commit hash) in your incident or operations log.

## Post-Rollback Follow-Up
- Record incident notes (timestamp, root cause, commit IDs) in your operations log.
- Investigate the failed deployment logs to identify required fixes before allowing new releases from `main`.
- Re-run local checks (`npm run lint`, `npm test`, `npm run check:vercel-env`) before pushing the fix commit.

## References
- Deployment overview: `docs/deployment/vercel.md`
- Feature clarifications: `specs/002-i-want-to/spec.md#clarifications`
- Quickstart validation flow: `specs/002-i-want-to/quickstart.md`