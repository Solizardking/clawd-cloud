---
id: github-deploy
active: true
priority: high
created: 2026-08-14
skill: github-deploy
---

# Goal: Keep Core AI GitHub-deployable

## Mission

Ship `clawd-cloud/core-ai` as an enterprise-grade GitHub repository: mapped README, CI, secret scan, LICENSE, security policy, and a complete package catalog.

## Sense

- `MANIFEST.json` lists every required directory.
- `scripts/check-structure.mjs` fails if a directory is missing or unmapped.
- `scripts/secret-scan.mjs` fails if live secrets land in git.

## Act

- Update the README in the same change as any package add/remove.
- Keep workflows at the **repository root** `.github/` so GitHub Actions actually run.
- Prefer package-local `node --test` suites that do not need live API keys.
