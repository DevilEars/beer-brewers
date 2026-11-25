# Security

Please report vulnerabilities privately: use GitHub's private vulnerability
reporting on this repo if it is enabled, otherwise contact the owner
([DevilEars](https://github.com/DevilEars)). Do not open a public issue for a
live vulnerability.

Do not commit secrets (`.env`, keystores, credentials).

CI fails `npm audit --audit-level=high` on every lockfile, including
devDependencies. Do not use `npm audit fix --force`. Upgrade the offending
package on its own branch and review breaking changes first.

This repository also runs Gitleaks on pushes and pull requests as a
secret-scanning fallback that does not depend on GitHub Advanced Security.

If you accidentally commit a secret, assume it is compromised: rotate it
first, then report it privately so the history can be cleaned up.
