# Phase 1 Data Model: Deploy Project to Vercel

## Configuration Entities

### EnvironmentVariable
- key: string; unique identifier (e.g., DATABASE_URL, NEXTAUTH_SECRET).
- valueSource: enum {VercelSecret, RepositoryDotEnv, PlanetScaleDashboard}; recorded in deployment documentation.
- scope: enum {Build, Runtime, Optional}; build/runtime classification prevents missing secrets during deploy.
- lastVerified: ISO 8601 timestamp captured when value was last confirmed working.
- Validation Rules:
  - key MUST match documented list in quickstart.
  - Secrets stored via `vercel env` MUST be created before the first Hobby deployment.

### DeploymentConfiguration
- branch: string; defaults to `main`.
- region: string; defaults to `fra1` per `vercel.json`.
- plan: enum {Hobby}; enforced to keep usage within limits.
- autoRedeploy: boolean; set to `true` for `main` branch only.
- Relationships:
  - Has many `EnvironmentVariable` definitions.

## Notes
- No database schema changes are required; entities are documentation artifacts tracked in specs/release checklist.
- Record updates in docs (`quickstart.md`, operations checklist) rather than persistent storage.