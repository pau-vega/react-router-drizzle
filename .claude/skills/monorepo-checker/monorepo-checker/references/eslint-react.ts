// eslint.config.ts — for React app/library packages (e.g. apps/web, packages/ui)
// Uses the "react" preset from @react-router-drizzle/eslint-config
import { react } from "@react-router-drizzle/eslint-config"
import { defineConfig } from "eslint/config"

export default defineConfig([
  ...react,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // Add package-specific rule overrides here
  },
])
