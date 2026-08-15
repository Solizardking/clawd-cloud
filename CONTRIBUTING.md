# Contributing

This repository deploys **Clawd Core AI** to GitHub as `Solizardking/clawd-cloud`. Application code lives under [`core-ai/`](./core-ai).

## Before a pull request

```bash
cd core-ai
npm run verify
```

That command:

1. Confirms every `MANIFEST.json` directory exists and is mapped in `core-ai/README.md`
2. Scans tracked files for secret-like material
3. Runs package-local `node --test` suites that do not need live API keys

If you add, remove, or rename a directory under `core-ai/`, update `MANIFEST.json` and the README map in the same change.

## Package-local tests

Heavier packages (`clawd-mcp`, `clawd-cli`, `membrain`, `solana-mcp`) keep their own install/build/test flows. Run those from the package directory when you touch them.

## Commits

Prefer conventional titles: `feat(mcp): ...`, `fix(wallet): ...`, `docs(readme): ...`. Signed commits are recommended for maintainers (`CONTRIBUTING.md` in `core-ai/` describes setup).

By contributing you agree that your work is licensed under the MIT License except where a file already declares CC0 (the constitution).
