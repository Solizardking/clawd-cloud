# TailClawd

Private-grade operator dashboard for Clawd Cloud. Solana purple `#9945FF` and green `#14F195`. Live session tracking, metrics, traces, and stack health — without embedding secrets in the UI.

The historical TailClawd surface lived outside the public `solana-clawd` tree. This package is the GitHub-deployable control plane: a local HTTP console that reads only public package metadata and process health.

## Run

```bash
cd core-ai/tailclawd
cp .env.example .env   # optional
npm start              # http://127.0.0.1:4402
```

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /health` | public | Process liveness |
| `GET /v1/catalog` | public | Core AI package map from `MANIFEST.json` |
| `GET /v1/sessions` | public | In-memory session list (empty until an agent registers) |
| `GET /` | public | Operator console |

Do not bind this process to a public interface in production without TLS and an allowlist. Default bind is `127.0.0.1`.

## Environment

See [`.env.example`](./.env.example). No API keys are required for health or catalog. Session ingest is local-memory only in this tree.
