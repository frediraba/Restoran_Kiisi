# Vercel Deployment Contract

## Trigger
- Source: Git push to `main` (GitHub).
- Condition: Repository connected to Vercel project `restoran-kiisi` (Hobby plan).
- Action: Vercel builds the Next.js app using `npm run build` and deploys to Production.

## Inputs
| Key | Source | Required | Notes |
|-----|--------|----------|-------|
| DATABASE_URL | Vercel Secret (`vercel env add`) | Yes | PlanetScale connection string with `sslaccept=strict`. |
| DIRECT_DATABASE_URL | Vercel Secret | Yes | Required for Prisma CLI operations during build. |
| NEXTAUTH_SECRET | Vercel Secret | Yes | Must be a strong random value; used for session encryption. |
| NEXTAUTH_URL | Vercel Environment Variable | Yes | Must point to production deployment URL. |
| ORDER_FORCE_CLOSED | Optional | No | Toggle for maintenance windows; leave unset by default. |

## Build Steps
1. Install dependencies via `npm install` (defined in `vercel.json`).
2. Run `npm run build` (Next.js 15 Turbopack) with environment variables available at build time.
3. Promote deployment to Production when the build succeeds.

## Outputs
- Production URL accessible via the Vercel dashboard (private validation by deployment owner).
- Deployment status logs retained in the Vercel dashboard for manual review.

## Failure Handling
- Build or quota failure leaves deployment in error state; no automatic rollback is triggered.
- Deployment owner reviews logs in the dashboard, addresses the issue locally, and pushes a corrected commit to `main`.

## Security Considerations
- Secrets stored only in the Vercel environment; ensure `.env` files are excluded from VCS (already in `.gitignore`).
- Access to the Vercel project should remain restricted to the deployment owner per clarification.