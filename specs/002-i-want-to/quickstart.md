# Quickstart: Deploy Project to Vercel (Hobby)

## Prerequisites
1. Install the Vercel CLI (`npm install -g vercel`) or use the Vercel web dashboard.
2. Log in to Vercel with the deployment owner account (`vercel login`).
3. Ensure PlanetScale credentials are available for production database connections.

## One-Time Setup
1. Link repository to the Vercel project (run `vercel link` inside the repo or connect via dashboard).
2. Set required environment variables (Production scope):
   ```sh
   vercel env add DATABASE_URL
   vercel env add DIRECT_DATABASE_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   # Optional toggle
   # vercel env add ORDER_FORCE_CLOSED
   ```
3. Confirm project settings:
   - Framework preset: Next.js.
   - Build command: `npm run build` (default).
   - Output directory: `.vercel/output` (managed by Next.js).
   - Region: `fra1`.
   - Git auto-deploy branch: `main`.

## Deploying from Main
1. Push or merge the latest changes into `main` on GitHub.
2. Vercel automatically starts a build (visible in the dashboard Deployments tab).
3. Wait for status `Ready`; open the Production URL from the dashboard to verify it loads without errors.
4. Record the verification timestamp in release notes or the operations checklist.

## Handling Failures
1. If the deployment shows `Error`, open build logs from the dashboard.
2. Address the root cause locally (e.g., missing env var, build failure) and push a corrective commit to `main`.
3. Manual rollback: redeploy a known-good commit by selecting it in the dashboard and clicking **Redeploy**.

## Post-Deployment Checks
- Run `npm run lint` and `npm test` locally before pushing to reduce build failures.
- Verify NextAuth redirects point to the dashboard URL configured in `NEXTAUTH_URL`.
- Optional: trigger `npm run seed:content` locally before pushing if seeding is required.