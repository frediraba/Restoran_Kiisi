#!/usr/bin/env tsx
import "dotenv/config";

import {
  OPTIONAL_ENV_VARIABLES,
  REQUIRED_ENV_VARIABLES,
  getMissingEnvVars,
} from "@/lib/config";

function logHeader(): void {
  console.log(`[check:vercel-env] Validating ${REQUIRED_ENV_VARIABLES.length} required secrets`);
}

function logSuccess(): void {
  console.log("[check:vercel-env] All required Vercel environment variables are present.");
}

function logMissing(missingKeys: string[]): void {
  console.error("[check:vercel-env] Missing required environment variables:\n" + missingKeys.join("\n"));
  console.error("\nPopulate them in Vercel via `vercel env add <KEY>` before pushing to main.");
}

function logOptional(): void {
  if (OPTIONAL_ENV_VARIABLES.length === 0) return;
  const unset = OPTIONAL_ENV_VARIABLES.filter((descriptor) => !process.env[descriptor.key]);
  if (unset.length === 0) return;
  console.log(
    "[check:vercel-env] Optional toggles unset (this is informational): " +
      unset.map((descriptor) => descriptor.key).join(", "),
  );
}

logHeader();
const missing = getMissingEnvVars();

if (missing.length > 0) {
  logMissing(missing);
  process.exitCode = 1;
} else {
  logSuccess();
}

logOptional();