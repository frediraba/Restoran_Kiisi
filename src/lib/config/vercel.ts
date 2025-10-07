export type EnvScope = "build" | "runtime";
export type EnvValueSource = "vercel-secret" | "vercel-environment";

export interface VercelEnvDescriptor {
  key: string;
  required: boolean;
  scopes: EnvScope[];
  valueSource: EnvValueSource;
  description: string;
}

const buildAndRuntime: EnvScope[] = ["build", "runtime"];
const runtimeOnly: EnvScope[] = ["runtime"];

export const VERCEL_ENV_VARIABLES: VercelEnvDescriptor[] = [
  {
    key: "DATABASE_URL",
    required: true,
    scopes: buildAndRuntime,
    valueSource: "vercel-secret",
    description: "PlanetScale pooled connection string used by Prisma at build and runtime.",
  },
  {
    key: "DIRECT_DATABASE_URL",
    required: true,
    scopes: buildAndRuntime,
    valueSource: "vercel-secret",
    description: "Direct PlanetScale connection string required by Prisma migrations during build.",
  },
  {
    key: "NEXTAUTH_SECRET",
    required: true,
    scopes: runtimeOnly,
    valueSource: "vercel-secret",
    description: "NextAuth session encryption secret shared across runtimes.",
  },
  {
    key: "NEXTAUTH_URL",
    required: true,
    scopes: runtimeOnly,
    valueSource: "vercel-secret",
    description: "Base URL for NextAuth callbacks in the production deployment.",
  },
  {
    key: "ORDER_FORCE_CLOSED",
    required: false,
    scopes: runtimeOnly,
    valueSource: "vercel-environment",
    description: "Optional toggle to pause ordering flows during incidents.",
  },
];

export const REQUIRED_ENV_VARIABLES = VERCEL_ENV_VARIABLES.filter(
  (descriptor) => descriptor.required,
);

export const OPTIONAL_ENV_VARIABLES = VERCEL_ENV_VARIABLES.filter(
  (descriptor) => !descriptor.required,
);

export function findEnvDescriptor(key: string): VercelEnvDescriptor | undefined {
  return VERCEL_ENV_VARIABLES.find((descriptor) => descriptor.key === key);
}

export function getMissingEnvVars(env: NodeJS.ProcessEnv = process.env): string[] {
  return REQUIRED_ENV_VARIABLES.filter((descriptor) => {
    const value = env[descriptor.key];
    return value === undefined || value === "";
  }).map((descriptor) => descriptor.key);
}