# Vercel Deployment Guide (Hobby Plan)

This guide captures the deployment flow defined in `specs/002-i-want-to/spec.md` and its clarifications. It is tailored for the single maintainer operating on the Vercel **Hobby** plan in region `fra1`, with automatic deployments triggered from the `main` branch.

## Clarification Snapshot
- Rollback is **manual**: redeploy a previously successful commit from the Vercel dashboard when production fails.
- Validation URL is private: only the maintainer needs access, retrieved directly from the dashboard.
- Deployment health is determined by the dashboard status feed; failed builds can remain until manually fixed.

## Prerequisites
- Vercel account with access to the `restoran-kiisi` project.
- PlanetScale database credentials (pooled + direct) stored securely.
- Node.js 20.x and npm 10.x locally for verification and tooling.
- Vercel CLI installed (`npm install -g vercel`) if you prefer command line workflows.
- Required environment secrets prepared:

| Key | Purpose | Scope |
| --- | --- | --- |
| `DATABASE_URL` | Prisma client connection string | Build + Runtime |
| `DIRECT_DATABASE_URL` | Prisma migration connection string | Build + Runtime |
| `NEXTAUTH_SECRET` | NextAuth session encryption | Runtime |
| `NEXTAUTH_URL` | Production callback base URL | Runtime |
| `ORDER_FORCE_CLOSED` *(optional)* | Pause ordering flows | Runtime |

## 1. Prepare Environment Variables Locally
1. Copy `.env.example` to `.env` if needed.
2. Populate the required keys above using secrets from PlanetScale and your secret manager.
3. Verify the values by running local smoke tests (`npm run lint`, `npm test`).
4. Run `npm run check:vercel-env` to confirm required keys are available.
   - Success shows `[check:vercel-env] All required Vercel environment variables are present.`
   - Failures exit with code 1 and list missing keys to provision via `vercel env add`.

## 2. Align Vercel Project Settings
1. Link the repository (`vercel link`) or confirm the GitHub integration is active.
2. Ensure the project uses the Next.js preset with commands:
   - Install: `npm install`
   - Build: `npm run build`
   - Output directory: `.vercel/output`
3. Confirm the runtime region is `fra1` (see `vercel.json`).
4. Restrict automatic deployments to the `main` branch.

## 3. Seed or Migrate Data (Optional)
Run migrations or seed scripts against PlanetScale before the first deploy:

```bash
npm install
npx prisma migrate deploy --schema=prisma/schema.prisma
# Optional seeds
npm run seed:content
npm run seed:profile
```

## 4. Initiate Deployment
1. Merge or push to `main`.
2. Monitor the deployment in the Vercel dashboard. The build must report `Ready` before production use.
3. Retrieve the production URL from the dashboard for personal validation.

## 5. Post-Deployment Checklist
- Navigate through `/`, `/menu`, `/order`, and `/account` to validate marketing and transactional flows.
- Confirm logs/metrics appear in Vercel Observability (`instrumentation.ts`).
- Record the validation timestamp in your operations notes.

## CLI Reference
Run these commands from the repository root when you need to operate purely via the Vercel CLI:

```sh
# Link local repo to the Vercel project
vercel link --project restoran-kiisi

# Provision secrets (you will be prompted for each value)
vercel env add DATABASE_URL production
vercel env add DIRECT_DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
# Optional toggle
# vercel env add ORDER_FORCE_CLOSED production

# Trigger a production deployment if necessary
vercel deploy --prod
```

### Dashboard Validation Notes
- Open the project dashboard and monitor the **Deployments** feed for a `Ready` status.
- Use the **Visit** button to grab the production URL for personal validation (per clarification, no broadcast required).
- The **Activity** tab captures build logs you can reference when `npm run check:vercel-env` reports missing secrets.

## Troubleshooting
| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| Build fails with Prisma errors | Missing `DATABASE_URL`/`DIRECT_DATABASE_URL` or unapplied migrations | Ensure secrets exist in Vercel and rerun `prisma migrate deploy`. |
| Auth errors post-deploy | `NEXTAUTH_SECRET` missing or different between environments | Rotate the secret, redeploy, and update `.env.example` if needed. |
| Slow transactional pages | Deployment region not `fra1` | Update `vercel.json` and redeploy. |
| Orders disabled unexpectedly | `ORDER_FORCE_CLOSED` set to `true` | Remove/flip the flag and redeploy. |

## Next Steps
- Re-run `npm run check:vercel-env` whenever secrets change.
- Use `docs/operations/vercel-rollback.md` if you need to recover via manual redeploy.