# Security Policy

Report vulnerabilities privately. Do not open a public issue for secrets, key material, or wallet compromise.

- GitHub Security Advisory: https://github.com/Solizardking/clawd-cloud/security/advisories/new
- Email: beetsbyj@gmail.com

## Rules

1. Never commit private keys, seed phrases, production `.env` files, or provider credentials.
2. Tracked env files are examples only (`**/.env.example`).
3. `core-ai/scripts/secret-scan.mjs` must stay green in CI.
4. Wallet packages are deny-first: agents ask before spending.
5. Pump MCP (`mcp-server`) builds transactions; it does not submit them.

## If a secret lands in git

Rotate the credential first. Then purge history with an approved tool (`git filter-repo` or BFG) and coordinate a force-push with every clone owner.
