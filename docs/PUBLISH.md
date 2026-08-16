# Publish Clawd Cloud

This directory **is** the public GitHub root: [Solizardking/clawd-cloud](https://github.com/Solizardking/clawd-cloud).

Before every push:

```bash
npm run verify
```

That checks the README map, scans for secrets, runs keyless tests, and runs `stack:doctor`.

## GitHub

Default branch: `main`. `newnew` is kept as a working branch.

```bash
git push -u origin HEAD
gh repo edit Solizardking/clawd-cloud --visibility public
```

Topics: `solana`, `mcp`, `ai-agents`, `helius`, `clawd`, `lobster`.

## npm

Root `package.json` is `"private": true`. Publish individual packages:

| Package | From | Tag |
| --- | --- | --- |
| `clawd-mcp` | `clawd-mcp/` | `clawd-mcp@x.y.z` |
| `clawd-cli` | `clawd-cli/` | `clawd-cli@x.y.z` |

MCP auto-publish: tag `clawd-mcp@*` → draft GitHub release → publishing the release runs [mcp-publish.yml](../.github/workflows/mcp-publish.yml) (needs `NPM_TOKEN`).

Do not force-push secrets. Do not flip `LIVE_TRADING` in committed examples.
