# Clawd Cloud architecture

Clawd Cloud is a four-layer harness. `./claw` is the operator. [`MANIFEST.json`](../MANIFEST.json) is the catalog.

```
you → ./claw → v3
             → clawd-code → clawd-plugin → clawd-skills → .agents
             → clawd-mcp  → clawd-connectors → clawd-wallet
             → clawd-core → constitution
             → membrain / tailclawd
```

| Layer | Packages | Job |
| --- | --- | --- |
| Agents | `clawd-code`, `clawd-agents`, `clawd-tui`, `clawd-grok`, `clawd-perps-agent`, `v3` | Run loops (code / trade / research / image / voice) |
| Identity | `clawd-core`, `clawd-character`, `clawd-goals`, `constitution` | Laws, persona, catalog, router |
| Core | `clawd-plugin`, `clawd-skills`, `clawd-mcp`, `.agents` | Skills + 10 public MCP tools |
| Edge | `clawd-connectors`, `clawd-wallet`, `clawd-router`, `solana-mcp`, `mcp-server`, `zk-primitives`, `membrain` | Live chain, pay, docs, memory |

Named capabilities (`chain`, `wallet`, `perps`, `memory`) are addressable without live RPC or a funded wallet. The router returns `delivered`, `unreachable`, or `unsupported`.

Trading is paper by default. See [`SECURITY.md`](../SECURITY.md).

Related: [ADR-001](adr/ADR-001-open-clawd-v2.md) · [clawd-code architecture](../clawd-code/docs/architecture.md) · [clawd-router architecture](../clawd-router/docs/architecture.md)
