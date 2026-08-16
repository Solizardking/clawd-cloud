# Publish Clawd Cloud

This directory **is** the public GitHub root: [Solizardking/clawd-cloud](https://github.com/Solizardking/clawd-cloud).

Before every push to `main` / `newnew`:

```bash
npm run verify
```

That checks the README map, scans for secrets, runs keyless tests, and runs `stack:doctor`.

Do not force-push secrets. Do not flip `LIVE_TRADING` in committed examples.

Topics that help discovery: `solana`, `mcp`, `ai-agents`, `helius`, `clawd`, `lobster`.
