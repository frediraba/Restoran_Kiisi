<<<<<<< HEAD
﻿import 'dotenv/config';
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
=======
import "dotenv/config";
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
>>>>>>> cf33733220b54065eff959e22a5c8a6b6d5e867a
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    include: ["tests/**/*.test.{ts,tsx}", "tests/contract/**/*.ts"],
<<<<<<< HEAD
    exclude: ["tests/integration/**"],
  },
=======
    exclude: ["tests/integration/**"],
  },
>>>>>>> cf33733220b54065eff959e22a5c8a6b6d5e867a
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
<<<<<<< HEAD
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});

=======
});
>>>>>>> cf33733220b54065eff959e22a5c8a6b6d5e867a
