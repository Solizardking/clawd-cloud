---
id: security-posture
active: true
priority: high
created: 2026-08-14
skill: security
---

# Goal: Hold the Core AI security posture

## Mission

No private keys, seed phrases, production `.env` files, or provider credentials in git. Wallet packages stay deny-first. MCP write tools must not silently submit transactions.

## Hard rules

1. `.env` is gitignored. Only `.env.example` is tracked.
2. TailClawd binds to loopback by default.
3. Character JSON and goal files never contain secrets.
4. If a secret is found, rotate it first, then purge history.
