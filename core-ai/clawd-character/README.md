# Clawd Character

Eliza-compatible character definitions for Clawd Core agents.

Canonical persona is [`clawd.json`](./clawd.json). Additional trading and research personas live beside it. Voice, lore, and style rules that agents should load at spawn are also documented in [`../knowledge/clawd-character.md`](../knowledge/clawd-character.md).

## Files

| File | Role |
|---|---|
| `clawd.json` | Default Clawd identity (x402, registry, vault, voice) |
| `schema.json` | JSON Schema for character documents |
| `mayhem-mode/` | Overlay for the gated trading bot |
| `*.json` | Named personas (Cheshire, research archetypes) |

## Validate

```bash
node --test tests/character.test.mjs
```

Never put private keys, seed phrases, or live API tokens in character JSON. Secrets belong in the operator environment.
