# Security policy

## Reporting a vulnerability

Please **do not** open a public issue, pull request, or discussion for a security vulnerability or a leaked secret.

Report the issue privately:

1. Use GitHub's private vulnerability reporting for this repository if it is available (the **Security** tab, or **Report a vulnerability** on the repo).
2. Otherwise, contact the repository owner ([DevilEars](https://github.com/DevilEars)) through a private GitHub channel and include enough detail to reproduce the issue.

We will try to acknowledge a valid report and let you know once a fix is in progress or has been released.

## Secrets in this repository

Do not commit API keys, tokens, passwords, private keys, or `.env` files.

- Pull requests are scanned with Gitleaks in GitHub Actions.
- If you accidentally commit a secret, assume it is compromised: rotate it first, then follow the reporting steps above so the history can be cleaned up.
