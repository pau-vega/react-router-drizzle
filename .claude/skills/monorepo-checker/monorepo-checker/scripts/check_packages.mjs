#!/usr/bin/env node
/**
 * Checks all packages in apps/ and packages/ for required scripts and config files.
 *
 * Usage (from monorepo root):
 *   node .claude/skills/monorepo-checker/monorepo-checker/scripts/check_packages.mjs
 */

import { existsSync, readdirSync, readFileSync } from "fs"
import { join } from "path"

const REQUIRED_SCRIPTS = ["dev", "build", "lint", "format", "typecheck"]
const REQUIRED_FILES = ["eslint.config.ts", ".prettierrc", ".prettierignore"]
const WORKSPACE_DIRS = ["apps", "packages"]

const root = process.cwd()

let totalErrors = 0

function checkPackage(pkgDir) {
  const pkgJsonPath = join(pkgDir, "package.json")
  if (!existsSync(pkgJsonPath)) return // not a package

  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8"))
  const name = pkgJson.name ?? pkgDir
  const scripts = pkgJson.scripts ?? {}

  const errors = []

  for (const script of REQUIRED_SCRIPTS) {
    if (!scripts[script]) errors.push(`missing script: "${script}"`)
  }

  for (const file of REQUIRED_FILES) {
    if (!existsSync(join(pkgDir, file))) errors.push(`missing file: ${file}`)
  }

  if (errors.length === 0) {
    console.log(`  ✓  ${name}`)
  } else {
    console.log(`  ✗  ${name}`)
    for (const err of errors) console.log(`       - ${err}`)
    totalErrors += errors.length
  }
}

for (const workspace of WORKSPACE_DIRS) {
  const wsPath = join(root, workspace)
  if (!existsSync(wsPath)) continue

  const entries = readdirSync(wsPath, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => join(wsPath, e.name))

  if (entries.length === 0) continue

  console.log(`\n${workspace}/`)
  for (const entry of entries) checkPackage(entry)
}

console.log("")
if (totalErrors === 0) {
  console.log("All packages conform to the required structure.")
  process.exit(0)
} else {
  console.log(`Found ${totalErrors} issue(s). See above for details.`)
  process.exit(1)
}
