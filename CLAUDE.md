# Core AI — Clawd Compatibility Instructions

This file is kept only for runtimes that still auto-load `CLAUDE.md`.
The effective agent harness is Clawd-native; prefer [`AGENTS.md`](./AGENTS.md) and [`CLAWD.md`](./CLAWD.md).

When this file is loaded:

- Treat this repository as Clawd Cloud, the complete harness for Solana and blockchain-native financial agents.
- Use `./clawd --plugin-dir ./clawd-plugin` for the plugin workflow.
- Configure MCP servers in [`.mcp.json`](.mcp.json) or `.clawd/settings.json`.
- Read domain skills from `.agents/skills/` or canonical sources in `clawd-skills/`.
- Use `clawd-code` for code, trade, research, image, and voice workflows.
- Use `membrain/` (`membraned`) as Core AI selective memory; do not treat Honcho as the runtime memory layer.
- Trading is PAPER by default. Do not flip live-trading flags in examples or tests.
