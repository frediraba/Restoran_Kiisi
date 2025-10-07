import {
  OPTIONAL_ENV_VARIABLES,
  REQUIRED_ENV_VARIABLES,
  VERCEL_ENV_VARIABLES,
  findEnvDescriptor,
  getMissingEnvVars,
} from "./vercel";

export type { EnvScope, EnvValueSource, VercelEnvDescriptor } from "./vercel";
export {
  OPTIONAL_ENV_VARIABLES,
  REQUIRED_ENV_VARIABLES,
  VERCEL_ENV_VARIABLES,
  findEnvDescriptor,
  getMissingEnvVars,
};

export interface DeploymentConfiguration {
  branch: string;
  region: string;
  plan: "hobby";
  autoRedeploy: {
    branch: string;
    enabled: boolean;
  };
  environmentVariables: typeof VERCEL_ENV_VARIABLES;
}

export const DEPLOYMENT_CONFIGURATION: DeploymentConfiguration = {
  branch: "main",
  region: "fra1",
  plan: "hobby",
  autoRedeploy: {
    branch: "main",
    enabled: true,
  },
  environmentVariables: VERCEL_ENV_VARIABLES,
};