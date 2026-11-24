# Contributing

Thank you for helping with beer-brewers.

## Branch and pull request workflow

**All changes go through a branch and a pull request into `master`. Never push commits directly to `master`.**

1. Fork the repository if you do not have push access, or create a branch in this repo if you do.
2. Branch from up-to-date `master`. Use a short, descriptive name (for example `setup/repo-hygiene-and-research` or `docs/update-suppliers`).
3. Make your changes. Do not commit secrets, `.env` files, credentials, or private keys.
4. Open a pull request against `master` and fill in the PR template.
5. Wait for CI (including the Gitleaks scan) and any requested review to finish before merging.

The default branch is protected by a repository ruleset that requires a pull request and blocks force-pushes and branch deletion. Required approving reviews are set to zero so a solo maintainer can still merge their own PR after CI. Do not use admin bypass to push straight to `master`.

## What this repository is for

Two planned deliverables, plus the existing South African supplier list:

- A recipe app (see `apps/recipe-app/` and `docs/adr/0001-recipe-format.md`).
- An open-source DIY hardware/software resource (see `hardware/`).

The supplier list lives in [`docs/suppliers.md`](docs/suppliers.md). Prefer updating that file to keeping parallel lists in the root README.

## License

Contributions are accepted under the [MIT License](LICENSE).
