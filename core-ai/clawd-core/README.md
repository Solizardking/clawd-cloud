# `@clawd/core`

Identity umbrella for the Clawd Core AI stack.

Clawd Core is the name of the system. This package does not talk to the chain by itself. It publishes the catalog every other package in `core-ai/` must appear in, so GitHub CI, operator dashboards, and agents share one map.

## Install

```bash
cd core-ai/clawd-core
node src/cli.mjs catalog
node --test
```

## Commands

| Command | Purpose |
|---|---|
| `node src/cli.mjs catalog` | Print every package path, layer, and summary |
| `node src/cli.mjs layers` | Group the same map by architecture layer |
| `node src/cli.mjs json` | Dump `../MANIFEST.json` |

## Source of truth

[`../MANIFEST.json`](../MANIFEST.json) is canonical. The root [`README.md`](../README.md) must map every `required` path. `node ../scripts/check-structure.mjs` enforces both.
