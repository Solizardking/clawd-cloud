# `@clawd/tui`

Terminal operator surface for Clawd Core.

This package ships a standalone doctor/CLI that any agent or human can run without the rest of the monorepo. The historical gateway TUI from `solana-clawd/apps/tui` is preserved under [`upstream/`](./upstream) for provenance. Those files import sibling gateway modules and are not the default binary.

## Run

```bash
cd core-ai/clawd-tui
node src/cli.mjs doctor
node --test
```

| Command | Purpose |
|---|---|
| `clawd-tui doctor` | Check Node version and whether chain/LLM env vars are set (never prints values) |
| `clawd-tui theme` | Print the Solana purple/green theme tokens |
| `clawd-tui help` | Usage |

## Security

Do not hard-code API keys or wallet secrets in this tree. `doctor` only reports whether a variable is present.
