# `@clawd/core`

Identity umbrella and Clawd Cloud fabric for this tree.

Clawd Cloud is the name of the assembled harness. This package does not talk to the chain by itself. It publishes the catalog every other package must appear in, plus the registry and router that let agents, identity, MCP/chain, wallet/pay, memory, and ops reach each other.

## Install

```bash
cd clawd-core
node src/cli.mjs catalog
node src/cli.mjs cloud
node --test
```

## Commands

| Command | Purpose |
|---|---|
| `node src/cli.mjs catalog` | Print every package path, layer, and communication target |
| `node src/cli.mjs cloud` | Destinations, named capabilities, and routes |
| `node src/cli.mjs layers` | Group the same map by architecture layer |
| `node src/cli.mjs json` | Dump `../MANIFEST.json` |

## Fabric

- [`src/cloud-map.mjs`](./src/cloud-map.mjs) — invoke/endpoint per MANIFEST path, plus `chain`/`wallet`/`perps`/`memory` capabilities
- [`src/registry.mjs`](./src/registry.mjs) — merge live MANIFEST + targets
- [`src/router.mjs`](./src/router.mjs) — `routeMessage({ sender, destination, message })` → `delivered` / `unreachable` / `unsupported`
- [`src/adapters.mjs`](./src/adapters.mjs) — default (addressable) and in-process adapters

`./claw cloud` and `./claw route` call this same registry.

## Source of truth

[`../MANIFEST.json`](../MANIFEST.json) is canonical. The root [`README.md`](../README.md) must map every `required` path. `node ../scripts/check-structure.mjs` enforces both.
