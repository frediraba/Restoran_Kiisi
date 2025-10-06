import 'dotenv/config';
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    include: ["tests/**/*.test.{ts,tsx}", "tests/contract/**/*.ts"],
    exclude: ["tests/integration/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

