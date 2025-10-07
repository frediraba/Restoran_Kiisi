import { describe, expect, it } from "vitest";

import { VERCEL_ENV_VARIABLES } from "@/lib/config/vercel";

describe("Vercel environment configuration metadata", () => {
  const getDescriptor = (key: string) =>
    VERCEL_ENV_VARIABLES.find((descriptor) => descriptor.key === key);

  it("declares all required production secrets", () => {
    const requiredKeys = [
      "DATABASE_URL",
      "DIRECT_DATABASE_URL",
      "NEXTAUTH_SECRET",
      "NEXTAUTH_URL",
    ];

    for (const key of requiredKeys) {
      const descriptor = getDescriptor(key);
      expect(descriptor, `${key} descriptor`).toBeDefined();
      expect(descriptor?.required, `${key} required flag`).toBe(true);
      expect(descriptor?.scopes, `${key} scope list`).toContain("runtime");
      expect(descriptor?.valueSource, `${key} source`).toBe("vercel-secret");
    }
  });

  it("marks ORDER_FORCE_CLOSED as optional runtime flag", () => {
    const descriptor = getDescriptor("ORDER_FORCE_CLOSED");
    expect(descriptor, "descriptor exists").toBeDefined();
    expect(descriptor?.required).toBe(false);
    expect(descriptor?.scopes).toEqual(["runtime"]);
  });
});