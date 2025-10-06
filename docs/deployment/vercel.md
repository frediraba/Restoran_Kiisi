# Vercel Deployment Guide

This guide documents the production rollout process for Restoran Kiisi on [Vercel](https://vercel.com/). It assumes you already have a GitHub repository for the application and access to the PlanetScale database defined in `prisma/schema.prisma`.

## Prerequisites

- Vercel account with permission to create projects and environment variables.
- PlanetScale MySQL database provisioned in an EU region (e.g. `eu-central`), with credentials for both pooled (use in app) and direct connections.
- Node.js 20.x and npm 10.x locally for running migrations or verifying builds.

## 1. Prepare environment variables

1. Copy `.env.example` to `.env`.
2. Update the placeholders with real values from PlanetScale and your secret manager:
   - `DATABASE_URL` – Prisma client connection string (PlanetScale pooled).
   - `DIRECT_DATABASE_URL` – Direct connection string used for migrations.
   - `NEXTAUTH_SECRET` – 32+ character random string. You can generate one with `openssl rand -base64 32`.
   - `NEXTAUTH_URL` – Production URL (e.g. `https://restoran-kiisi.vercel.app`).
   - Optionally define `ORDER_FORCE_CLOSED=true` when you need to stop online ordering temporarily.
3. Commit **only** `.env.example`. Never commit secrets.

## 2. Run database migrations

Before the first deploy (and whenever Prisma schema changes), run migrations against PlanetScale from your local machine or CI environment:

```bash
npm install
npx prisma migrate deploy --schema=prisma/schema.prisma
```

Seed data is available to populate demo content:

```bash
npm run seed:content
npm run seed:profile
```

(Seeds should target non-production environments.)

## 3. Create the Vercel project

1. Push your repository to GitHub.
2. In Vercel, click **New Project** and import the repository.
3. Vercel detects the Next.js framework automatically. Keep the defaults:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.vercel/output`
4. Set the deployment region to `fra1` (Frankfurt) to keep runtime close to the PlanetScale EU database. This is configured in `vercel.json` but can also be set in the Vercel UI under **Settings → Functions**.

## 4. Configure environment variables in Vercel

1. In the project dashboard, open **Settings → Environment Variables**.
2. Add the same keys and values from your local `.env` file.
3. For `NEXTAUTH_URL`, set environment-specific values:
   - Production: `https://your-domain`.
   - Preview: `https://<branch>-<project>.vercel.app`.
4. Click **Save** and redeploy when prompted.

## 5. Trigger the first deployment

1. Merge your changes to the default branch.
2. Vercel builds automatically. You can also trigger a deployment manually with `vercel --prod` if using the CLI.
3. Wait for the build to complete and verify the deployment logs. Next.js server actions under `app/(transactions)` run on the Node.js runtime; marketing pages use the Edge network for low-latency caching.

## 6. Post-deployment validation

- Visit `/` and `/menu` to confirm static marketing pages render via Edge.
- Visit `/order` and `/account` to validate transactional flows. Ensure orders persist in PlanetScale.
- Confirm logs and traces arrive in Vercel Observability (configured via `instrumentation.ts`).
- If marketing pages show stale data, run `npm run revalidate:hours` locally and redeploy.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Build fails with Prisma errors | Missing `DATABASE_URL`/`DIRECT_DATABASE_URL` or Prisma schema migrations not applied | Double-check env vars and run `prisma migrate deploy` |
| Authentication fails in production | `NEXTAUTH_SECRET` missing or mismatch between environments | Rotate `NEXTAUTH_SECRET` and redeploy |
| Orders close outside business hours | `LocationHours` data missing or `ORDER_FORCE_CLOSED` set to `true` | Seed data / toggle flag |
| Slow transactional routes | Deployment running outside EU region | Verify `preferredRegion` on layouts and `regions` in `vercel.json` |

## Ongoing maintenance

- Rotate secrets every 90 days.
- Monitor uptime via Vercel checks and custom metrics described in `docs/ops-runbook.md`.
- Use the `ORDER_FORCE_CLOSED` flag during incidents to pause new orders while keeping marketing pages online.
