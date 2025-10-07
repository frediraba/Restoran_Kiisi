# Phase 0 Research Summary: Deploy Project to Vercel

## Topic: Vercel Environment Variables
- Decision: Capture DATABASE_URL, DIRECT_DATABASE_URL, NEXTAUTH_SECRET, and NEXTAUTH_URL in Vercel project secrets before first deployment; leave optional feature toggles documented but disabled.
- Rationale: `.env.example` defines the minimum configuration for Prisma, NextAuth, and runtime links; Vercel Hobby deployments fail without these values.
- Alternatives Considered: Infer requirements from runtime errors (rejected because it delays deployment and risks exposing incomplete secrets).

## Topic: Vercel Hobby Plan Guardrails
- Decision: Target the Vercel Hobby (free) plan with region `fra1` to stay aligned with the current `vercel.json` configuration.
- Rationale: Hobby plan covers single maintainer usage, provides automatic HTTPS, and matches the spec clarification; `fra1` keeps traffic within the EU alongside the PlanetScale deployment.
- Alternatives Considered: Upgrade to Pro (team features) or Enterprise (managed SLAs); rejected because current scope supports only solo validation.

## Topic: Deployment Trigger Branch
- Decision: Configure Vercel to automatically deploy commits pushed to the `main` branch; block other branches from auto-publishing.
- Rationale: Clarification response selected the `main` branch; aligns with existing repository workflow and reduces accidental releases.
- Alternatives Considered: Dedicated `release` branch (adds overhead) or manual promote workflow (slower feedback loop).

## Topic: Failure Handling Signals
- Decision: Treat Vercel dashboard status as the single source of truth; investigate failures manually while allowing successful deployments to remain available.
- Rationale: Clarification states failures may be ignored, so we surface status but do not build automation around retries.
- Alternatives Considered: Automated rollback or retry flows (discarded to stay within spec scope and Hobby limits).

## Topic: Deployment Owner Communication
- Decision: Limit deployment URL distribution to the maintainer through the Vercel dashboard and document the retrieval steps in quickstart.
- Rationale: Clarification indicates private validation; avoids unnecessary notifications.
- Alternatives Considered: Email or Slack broadcasts; rejected per clarification.