// eslint.config.ts — for Node/library packages (e.g. packages/eslint-config, packages/db, etc.)
// Uses the "node" preset from @react-router-drizzle/eslint-config
import { node } from "@react-router-drizzle/eslint-config"
import { defineConfig } from "eslint/config"

export default defineConfig([
  ...node,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // Add package-specific rule overrides here
  },
])
