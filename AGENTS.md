# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

pnpm + Turborepo monorepo with two workspace locations: `apps/*` and `packages/*`.

**Node >= 24** (see `.nvmrc`), **pnpm 10.29.3** (corepack).

## Commands

```bash
pnpm install              # install dependencies
pnpm dev                  # run all packages/apps in dev mode (turbo)
pnpm build                # build all packages (turbo, outputs to dist/)
pnpm lint                 # lint all packages (eslint --fix)
pnpm format               # format all packages (prettier --write)
pnpm typecheck            # typecheck all packages (tsc --noEmit)
pnpm nuke                 # remove all build artifacts (dist, node_modules, .turbo, .next, .cache, coverage)
pnpm phoenix              # nuke + reinstall (full reset)
pnpm check:shadcn         # check for shadcn component updates (runs in packages/ui)
```

Run tasks for a single package: `pnpm --filter <package-name> <script>` (e.g. `pnpm --filter @react-router-drizzle/ui build`).

## Packages

- **`packages/ui`** — Shared React component library built with shadcn/ui patterns, `@base-ui/react` primitives (Base UI from MUI), Tailwind CSS v4, and `class-variance-authority`. Built with `tsup` (ESM only, `"use client"` banner on all outputs). Exports components, hooks, and `globals.css`. Uses `tailwind-merge` + `clsx` via `cn()` utility in `src/lib/utils.ts`.
- **`packages/eslint-config`** — Shared ESLint flat config. Exports `node` and `react` presets. Uses `typescript-eslint`, `eslint-plugin-perfectionist`, `eslint-config-prettier`, and `@eslint-react`.

## Required Scripts

Every app and package in this monorepo **must** define the following scripts in its `package.json`:

- `dev` — start development server / watch mode
- `build` — compile/bundle for production
- `lint` — run ESLint (with `--fix`)
- `format` — run Prettier (with `--write`)
- `typecheck` — run `tsc --noEmit`

## Architecture Notes

- All packages use ESM (`"type": "module"`).
- TypeScript config extends `@tsconfig/node24` via `tsconfig.base.json` at root (`moduleResolution: "bundler"`). Each package has its own `tsconfig.json`.
- Turbo tasks: `build`, `dev`, `typecheck`, `lint`, `format`. Build outputs go to `dist/`. `build` depends on `^build` (dependencies built first).
- UI package components follow shadcn/ui patterns — each component in its own file under `src/components/`, hooks under `src/hooks/`, all re-exported from `src/index.ts`. The tsup config builds each component as a separate output file for granular imports.
- UI uses `@base-ui/react` (not Radix UI) for headless primitives. Do not add `@radix-ui/*` packages.
- When adding a new component to `packages/ui`, add it to `src/index.ts`. The tsup config auto-discovers components via glob.
