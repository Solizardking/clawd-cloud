# Clawd Goals

Active mission files for Core AI agents.

Each Markdown file uses YAML frontmatter. Agents load files with `active: true` and inject them into the system prompt, highest priority first.

```yaml
---
id: github-deploy
active: true
priority: high
created: 2026-08-14
---
```

| File | Mission |
|---|---|
| [`github-deploy.md`](./github-deploy.md) | Keep this repo GitHub-deployable |
| [`security-posture.md`](./security-posture.md) | No secrets in git, deny-first wallets |
| [`percolator-bounty.md`](./percolator-bounty.md) | Authorized Percolator bounty keeper (inherited) |

Inactive goals stay in tree for history. Do not encode private keys or live credentials in goal bodies.
