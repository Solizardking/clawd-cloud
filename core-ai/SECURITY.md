# Security Policy

Report vulnerabilities privately. Do not open a public issue for secrets, key material, or wallet compromise.

- GitHub Security Advisory on the public Core AI repo
- Email: beetsbyj@gmail.com

## Rules

1. Never commit private keys, seed phrases, production `.env` files, or provider credentials.
2. Tracked env files are examples only (`**/.env.example`).
3. `scripts/secret-scan.mjs` must stay green in CI.
4. Wallet packages are deny-first: agents ask before spending.
5. Pump MCP (`mcp-server`) builds transactions; it does not submit them.
