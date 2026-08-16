# Security Policy

Report vulnerabilities privately. Do not open a public issue for secrets, key material, or wallet compromise.

- [GitHub Security Advisory](https://github.com/Solizardking/clawd-cloud/security/advisories/new)
- Email: beetsbyj@gmail.com
- Maintainer: [@Solizardking](https://github.com/Solizardking)

## Trading

Clawd Cloud defaults to **paper trading**. Live execution is off unless `LIVE_TRADING=true`, `OPERATOR_CONFIRMED=true`, and `PERPS_SIM_ONLY=false` are all set. Treat any path that signs or broadcasts a transaction as high risk.

## Secrets

Never commit:

- `.env` / `.env.local`
- wallet keypairs
- `HELIUS_API_KEY`, `DFLOW_API_KEY`, `XAI_API_KEY`, and other provider keys
- contents of `~/.clawd-code/`

Report leaked credentials by rotating them at the provider, then open a private report if this repo was the source.

## Rules

1. Never commit private keys, seed phrases, production `.env` files, or provider credentials.
2. Tracked env files are examples only (`**/.env.example`).
3. `scripts/secret-scan.mjs` must stay green in CI.
4. Wallet packages are deny-first: agents ask before spending.
5. Pump MCP (`mcp-server`) builds transactions; it does not submit them.

## Vulnerability reports

If you find a bug that can drain funds, bypass paper-mode gates, or exfiltrate keys:

1. **Do not** open a public issue with a working exploit.
2. Email the maintainer or open a private security advisory if enabled.

Please include impact, affected package path, and a minimal reproduction.

## Scope

In scope: `clawd-code/`, `clawd-connectors/`, `clawd-mcp/`, `clawd-plugin/`, `clawd-wallet/`, `clawd-router/`, `clawd-perps-agent/`, stack wiring, MCP config.

Out of scope: third-party MCP servers (Helius, DFlow, Jupiter, Birdeye) and upstream TUI copies under `clawd-tui/upstream`.
