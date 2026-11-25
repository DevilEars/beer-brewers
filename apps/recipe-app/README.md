# Recipe app

**Status:** placeholder. No application code has been written yet.

This directory will hold the beer-brewers recipe app: create, edit, store, and share recipes.

## Intended scope (first milestone)

- Create and edit a recipe.
- Estimate original gravity, IBU, colour, and ABV.
- Use **BeerJSON as the native format**, with **BeerXML import** for compatibility.
- Include a small set of sample recipes.

The format decision is recorded in [`docs/adr/0001-recipe-format.md`](../../docs/adr/0001-recipe-format.md). Background on formats and existing software is in [`docs/research/landscape-2026-11.md`](../../docs/research/landscape-2026-11.md).

Implementation language, UI, and packaging will be chosen in a later PR. Do not treat this folder as a usable app until that work lands.

## Repository Node baseline

The repository root currently has a minimal Node 24 `package.json` so that the shared `audit` and `ci` workflows can run. Those root scripts only check repository integrity (BOM parsing and markdown links). They are not the recipe app.

When this app is implemented, it should replace or extend that root package: keep `engines.node` at `>=24`, add real `typecheck` and `test` scripts for the app (and a build step if needed), and keep a committed lockfile that passes `npm ci` and `npm audit --audit-level=high`.
