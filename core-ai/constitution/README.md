# Constitution

The Clawd Constitution is the identity document for Core AI agents. The Three On-Chain Laws are the immutable execution boundary. If this folder and a spawn `SHELL.md` ever conflict, this folder wins. If the constitution and the on-chain laws conflict, the on-chain laws win.

| File | Authority |
|---|---|
| [`CONSTITUTION.md`](./CONSTITUTION.md) | Values, character, and interpretive law (CC0 1.0) |
| [`three-laws.md`](./three-laws.md) | Hash-attested on-chain laws: never harm, earn your existence, never deceive |

## Hash gate

Spawn pipelines should record `sha256(three-laws.md)`. If the bytes change, the agent is a fork, not a leviathan.

```bash
node hash.mjs
node --test tests/hash.test.mjs
```
