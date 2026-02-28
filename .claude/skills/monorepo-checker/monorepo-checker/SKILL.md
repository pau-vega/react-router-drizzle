---
name: monorepo-checker
description: >
  Audits and enforces workspace package structure for this pnpm + Turborepo monorepo.
  Use when: (1) checking or auditing the project/folder structure, (2) a package's npm
  script (dev, build, lint, format, typecheck) is missing or not working, (3) creating a
  new package and needing to know required files and scripts, (4) linting or validating
  the workspace setup, (5) any question about how packages should be structured or configured.
---

# Monorepo Package Checker

## Run the automated check

From the monorepo root, audit every package in `apps/` and `packages/`:

```bash
node .claude/skills/monorepo-checker/monorepo-checker/scripts/check_packages.mjs
```

Reports missing required scripts and missing config files per package. Exit code 1 if issues found.

## Requirements per package

Every package under `apps/` or `packages/` must have:

### Required scripts in `package.json`

| Script | Command |
|--------|---------|
| `dev` | `tsup --watch` (libraries) or framework dev server (apps) |
| `build` | `tsup` (libraries) or framework build (apps) |
| `lint` | `eslint . --fix` |
| `format` | `prettier --write .` |
| `typecheck` | `tsc --noEmit` |

### Required config files

| File | Purpose |
|------|---------|
| `eslint.config.ts` | ESLint flat config — never use legacy `.eslintrc` |
| `.prettierrc` | Prettier options |
| `.prettierignore` | Prettier ignore rules |
| `tsconfig.json` | Extends `../../tsconfig.base.json` |

## Templates for new packages

### `eslint.config.ts`

- **React package** (apps, UI libraries): see `references/eslint-react.ts`
- **Node/library package** (config, backend, tooling): see `references/eslint-node.ts`

Both extend `@react-router-drizzle/eslint-config`. Add it as a `devDependency` with `"workspace:*"`.

### `.prettierrc`

See `references/prettierrc.json`. Project-wide settings: `semi: false`, `printWidth: 120`.

### `.prettierignore`

See `references/prettierignore`. Copy as-is to every new package.

### `tsconfig.json` minimum

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

React packages add `"jsx": "react-jsx"` and optionally `"isolatedModules": true`.

## Adding a new package checklist

1. Create directory under `apps/<name>` or `packages/<name>`
2. Create `package.json` with all five required scripts (`dev`, `build`, `lint`, `format`, `typecheck`)
3. Add `eslint.config.ts` from the appropriate template
4. Add `.prettierrc` and `.prettierignore` from templates
5. Add `tsconfig.json` extending `../../tsconfig.base.json`
6. Run the check script to confirm conformance
