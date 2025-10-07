import { describe, expect, it } from "vitest";

import { DEPLOYMENT_CONFIGURATION } from "@/lib/config";

describe("Vercel deployment configuration export", () => {
  it("matches the clarified branch, region, and plan", () => {
    expect(DEPLOYMENT_CONFIGURATION.branch).toBe("main");
    expect(DEPLOYMENT_CONFIGURATION.region).toBe("fra1");
    expect(DEPLOYMENT_CONFIGURATION.plan).toBe("hobby");
    expect(DEPLOYMENT_CONFIGURATION.autoRedeploy).toEqual({
      branch: "main",
      enabled: true,
    });
  });
});