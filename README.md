# beer-brewers

An open-source homebrewing project for a small South African brewing team: a **recipe app**, and a **DIY hardware/software resource**, plus a list of local suppliers.

This repository is public and licensed under the [MIT License](LICENSE).

## Purpose

Keep brewing knowledge, recipes, and practical DIY build notes in one place that the team can review through pull requests. The original repo was a shared supplier list (2020–2021). That list is preserved in [`docs/suppliers.md`](docs/suppliers.md). The project is now being set up for two software/hardware deliverables.

## Deliverables

1. **Recipe app** — a tool for creating, storing, and sharing beer recipes. Native format is BeerJSON, with BeerXML import for compatibility. See the placeholder at [`apps/recipe-app/`](apps/recipe-app/) and the format decision in [`docs/adr/0001-recipe-format.md`](docs/adr/0001-recipe-format.md).
2. **Open-source DIY hardware and software resource** — a curated catalogue of controllers, sensors, and mash-system builds (BIAB / RIMS / HERMS and similar), with licenses, activity notes, and South African sourcing where we have it. Start at [`hardware/README.md`](hardware/README.md). The first design brief is a DIY electric all-in-one system: [`hardware/builds/diy-all-in-one/`](hardware/builds/diy-all-in-one/).

## Status

As of November 2026 this repository is in a **hygiene and research** stage:

- Repo metadata, license, contribution rules, and secret-scanning CI are being put in place.
- A research survey of recipe formats, open-source brewing software, and DIY hardware is in [`docs/research/landscape-2026-11.md`](docs/research/landscape-2026-11.md).
- The recipe app is **not started** beyond a placeholder README.
- The first hardware design brief is research and design only (see that folder's README for status, safety notes, and prices dated 24 November 2026).
- The supplier list has not been re-verified against current shop pages.

## Repository structure

```
apps/recipe-app/          Recipe app (placeholder)
docs/adr/                 Architecture decision records
docs/research/            Landscape research
docs/suppliers.md         South African craft / homebrew suppliers
hardware/                 DIY hardware and software resource
hardware/builds/          Specific build briefs
LICENSE
CONTRIBUTING.md
SECURITY.md
```

## Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md). **Work on a branch and open a pull request. Never push directly to `master`.**

## License

[MIT](LICENSE) — Copyright (c) 2026 De Villiers Neethling and beer-brewers contributors.

## Suppliers

The existing South African supplier list lives in [`docs/suppliers.md`](docs/suppliers.md).
