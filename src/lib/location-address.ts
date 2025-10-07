export type PrimitiveLocationAddress = {
  street?: string;
  city?: string;
};

export function parseLocationAddress(address: unknown): PrimitiveLocationAddress | null {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return null;
  }

  const record = address as Record<string, unknown>;
  const street = typeof record.street === "string" ? record.street : undefined;
  const city = typeof record.city === "string" ? record.city : undefined;

  if (!street && !city) {
    return null;
  }

  return { street, city };
}
