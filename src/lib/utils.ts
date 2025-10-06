export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | { [key: string]: boolean | string | number | null | undefined | false };

function toClassList(value: ClassValue, classes: string[]) {
  if (!value) {
    return;
  }

  if (typeof value === "string" || typeof value === "number") {
    const normalized = String(value).trim();
    if (normalized) {
      classes.push(normalized);
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      toClassList(entry, classes);
    }
    return;
  }

  if (typeof value === "object") {
    for (const [key, condition] of Object.entries(value)) {
      if (condition) {
        classes.push(key);
      }
    }
  }
}

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    toClassList(input, classes);
  }
  return classes.join(" ").replace(/\s+/g, " ").trim();
}

export function compact<T>(value: (T | null | undefined)[]): T[] {
  return value.filter((item): item is T => item !== null && item !== undefined);
}
