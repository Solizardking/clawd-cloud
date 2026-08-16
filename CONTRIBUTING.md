# Contributing to Clawd Cloud

Thanks for helping the lobster molt in public.

## Before you start

- Read [`README.md`](README.md) — especially how agents, identity, core, and edge talk through `./claw`.
- Run `npm run stack:doctor` and `npm run verify` from the repo root.
- Trading stays **PAPER** unless the user explicitly arms live mode. Do not flip that in examples or tests.

## Where to work

| Area | Path | Good first PRs |
| --- | --- | --- |
| Docs / README | `README.md`, `docs/` | clarity, broken links |
| Connectors | `clawd-connectors/` | provider status, tests |
| Plugin / skills | `clawd-plugin/`, `clawd-skills/` | skill copy, MCP registry |
| Catalog / router | `clawd-core/`, `MANIFEST.json` | destination map |
| MCP | `clawd-mcp/`, `mcp-server/`, `solana-mcp/` | tools, prompts |
| Operator | `claw`, `v3/`, `tailclawd/` | doctor, cloud map |

Keep changes small. Match nearby TypeScript / ESM style. Prefer existing command/tool patterns over new frameworks.

This monorepo houses several independent packages. Some packages have their own `CONTRIBUTING.md` (e.g. [`clawd-mcp/CONTRIBUTING.md`](clawd-mcp/CONTRIBUTING.md)) — read those too when working in that package.

## Checks

```bash
npm run stack:doctor
npm run verify
```

`verify` checks the README map, scans for secrets, and runs keyless package tests.

## Signing your commits (recommended)

**Maintainers should sign commits.** A verified commit is one GitHub can cryptographically tie to a registered signing key (GPG, SSH, or S/MIME). It shows a green **Verified** badge in the GitHub UI.

Follow GitHub's official guide: **https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits**

The short version:

1. Generate or choose a signing key (GPG or SSH).
2. Add the **public** key to your GitHub account under **Settings → SSH and GPG keys**.
3. Tell Git to use it:

   ```bash
   # SSH signing (simplest if you already have an SSH key on GitHub)
   git config --global gpg.format ssh
   git config --global user.signingkey ~/.ssh/id_ed25519.pub
   git config --global commit.gpgsign true
   ```

4. Confirm the email on your signing key matches a verified email on your GitHub account.

After committing, check the signature locally:

```bash
git log --show-signature -1
```

## Do not

- Commit `.env`, `.env.local`, keypairs, or API keys.
- Add live-trading defaults.
- Vendor secrets from `~/.clawd-code/`.
- Edit generated `.agents/skills/` or `clawd-mcp/system-prompts/` by hand — change `clawd-skills/` and recompile.

## Pull Requests

1. Fork the repository and create a clearly scoped branch from `main` (e.g. `feat/my-feature`, `fix/bug-description`).
2. One problem per PR.
3. Describe *why*, not a file list.
4. Open a pull request with a conventional title (e.g. `feat(mcp): ...`, `fix(cli): ...`, `docs(skills): ...`) and reference any related issues (`Closes #1234`).

Questions: open a GitHub issue on [Solizardking/clawd-cloud](https://github.com/Solizardking/clawd-cloud).

## License

By contributing, you agree that your contributions will be licensed under the repository's [MIT License](LICENSE).
