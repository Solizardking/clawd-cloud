<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=🦞%20CLAWD%20CLOUD&fontSize=52&fontAlignY=30&fontColor=ffffff&desc=open-source%20Solana%20AI%20agent%20harness&descSize=18&descAlignY=55&animation=twinkling" width="100%" alt="Clawd Cloud" />

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=20&duration=2200&pause=600&color=F7931A&center=true&vCenter=true&multiline=true&repeat=true&width=920&height=110&lines=Clawd+is+the+identity.+Helius+is+the+pipe.;Agents+%C2%B7+Identity+%C2%B7+Chain+%C2%B7+Pay+%C2%B7+Memory;Open+source.+Solana-native.+MCP-powered.;CODE+%C2%B7+TRADE+%C2%B7+RESEARCH+%C2%B7+IMAGE+%C2%B7+VOICE)](https://github.com/Solizardking/clawd-cloud)

**The complete harness for Solana and blockchain-native financial agents — one checkout, one router, live MCP.**

<br />

[![GitHub stars](https://img.shields.io/github/stars/Solizardking/clawd-cloud?style=for-the-badge&logo=github&color=F7931A)](https://github.com/Solizardking/clawd-cloud/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Solizardking/clawd-cloud?style=for-the-badge&logo=github&color=14F195)](https://github.com/Solizardking/clawd-cloud/network/members)
[![Last commit](https://img.shields.io/github/last-commit/Solizardking/clawd-cloud?style=for-the-badge&color=8B5CF6)](https://github.com/Solizardking/clawd-cloud/commits)
[![Issues](https://img.shields.io/github/issues/Solizardking/clawd-cloud?style=for-the-badge&color=3B82F6)](https://github.com/Solizardking/clawd-cloud/issues)

[![npm clawd-mcp](https://img.shields.io/npm/v/clawd-mcp?label=clawd-mcp&color=cb3837&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/clawd-mcp)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Solana](https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=black)](https://solana.com)
[![MCP](https://img.shields.io/badge/MCP-live-blueviolet?style=for-the-badge)](https://modelcontextprotocol.io)
[![Security](https://img.shields.io/badge/Security-advisories-red?style=for-the-badge)](SECURITY.md)

[![Buy $CLAWD](https://img.shields.io/badge/Buy_%24CLAWD-Phantom-blueviolet?style=flat-square)](https://phantom.com/tokens/solana/8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump)
[![Dexscreener](https://img.shields.io/badge/Chart-Dexscreener-green?style=flat-square)](https://dexscreener.com/solana/8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump)
[![Birdeye](https://img.shields.io/badge/Chart-Birdeye-orange?style=flat-square)](https://birdeye.so/token/8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump)
[![Jupiter](https://img.shields.io/badge/Swap-Jupiter-blue?style=flat-square)](https://jup.ag/swap/SOL-8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump)

`8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump`

<br />

<img src="https://github-readme-stats.vercel.app/api/pin/?username=Solizardking&repo=clawd-cloud&theme=radical&hide_border=true&show_owner=true" alt="clawd-cloud repo card" />

</div>

---

## 60-second start

```bash
git clone https://github.com/Solizardking/clawd-cloud.git
cd clawd-cloud
chmod +x claw clawd
cp .env.example .env.local          # add HELIUS_API_KEY (and any LLM keys)
npm run stack:doctor                # prove plugin, MCP, operator, catalog can see each other
./claw cloud                        # destinations + capabilities + routes
./clawd --plugin-dir ./clawd-plugin
```

Or skip the checkout and run the MCP server:

```bash
npx clawd-mcp@latest
```

> **Trading is PAPER by default.** Live orders require `LIVE_TRADING=true`, `OPERATOR_CONFIRMED=true`, and `PERPS_SIM_ONLY=false`. Never commit `.env` / `.env.local`.

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=16&duration=1800&pause=400&color=14F195&center=true&vCenter=true&repeat=true&width=780&height=28&lines=%24+npm+run+stack%3Adoctor;%24+.%2Fclaw+cloud;%24+.%2Fclawd+--plugin-dir+.%2Fclawd-plugin;%24+clawd-code+trade+%22SOL+funding+rate%22" alt="commands" />
</p>

<img src="docs/assets/clawd-boot.svg" alt="Animated Clawd Cloud boot terminal" width="100%">

---

## What you just cloned

Four layers that already speak through one router — `./claw`. Every package in [`MANIFEST.json`](MANIFEST.json) is a registered destination.

<table>
<tr>
<td width="25%" align="center">

### 🦞 Agents

CLI · TUI · v3 runtime

[`clawd-code/`](clawd-code/)
[`clawd-agents/`](clawd-agents/)
[`v3/`](v3/)

💻 CODE · 📈 TRADE · 🔬 RESEARCH

</td>
<td width="25%" align="center">

### 🪪 Identity

Laws · persona · goals

[`clawd-core/`](clawd-core/)
[`constitution/`](constitution/)
[`clawd-character/`](clawd-character/)

six laws · spawn hash

</td>
<td width="25%" align="center">

### 🧠 Core

Skills · plugin · MCP

[`clawd-plugin/`](clawd-plugin/)
[`clawd-skills/`](clawd-skills/)
[`clawd-mcp/`](clawd-mcp/)

10 public tools

</td>
<td width="25%" align="center">

### 🔌 Edge

Chain · pay · memory

[`clawd-connectors/`](clawd-connectors/)
[`clawd-wallet/`](clawd-wallet/)
[`membrain/`](membrain/)

DFlow · Helius · Jupiter

</td>
</tr>
</table>

```mermaid
%%{init: {"theme":"dark","themeVariables":{"primaryColor":"#142033","primaryTextColor":"#14F195","lineColor":"#9945FF","secondaryColor":"#0d1117","tertiaryColor":"#1e2a44","fontFamily":"ui-monospace, Menlo, monospace"}}}%%
flowchart TB
  You(("you")) --> CLAW["./claw"]
  CLAW --> V3["v3"]
  CLAW --> CC["clawd-code"]
  CC --> PL["clawd-plugin"]
  PL --> SK["clawd-skills"]
  SK --> AG[".agents"]
  MCP["clawd-mcp"] --> CONN["clawd-connectors"]
  CONN --> WAL["clawd-wallet"]
  RTR["clawd-router"] --> WAL
  CORE["clawd-core"] --> CON["constitution"]
  TAIL["tailclawd"] --> CORE
  MEM["membrain"] --> CORE
```

<div align="center">
  <img src="docs/assets/clawd-core-map.svg" alt="Animated Clawd Cloud architecture map" width="100%">
</div>

| Capability | Destinations | Addressable without |
| --- | --- | --- |
| `chain` / `mcp` | `clawd-mcp`, `clawd-connectors`, `solana-mcp`, `mcp-server` | live RPC |
| `wallet` / `pay` | `clawd-wallet`, `clawd-router` | a funded wallet |
| `perps` / `trade` | `clawd-perps-agent`, `v3` | live orders (paper first) |
| `memory` | `membrain` | a running daemon to *name* it |

```bash
./claw --help
./claw cloud
./claw status
./claw route v3 chain "get slot"
./claw route operator wallet "quote"
./claw route clawd-code perps "paper"
./claw route v3 memory "recall"
npm run catalog
```

The shipped router returns `delivered`, `unreachable`, or `unsupported`.

---

## Modes

```bash
clawd-code code "build a Jupiter swap bot with slippage protection"
clawd-code trade "what's the funding rate on SOL perps?"
clawd-code research "compare AutoGPT, LangChain, CrewAI, AutoGen"
clawd-code image "cyberpunk Solana trading desk"
clawd-code voice --persona eve
clawd-code arena status
```

<table>
<tr>
<td align="center" width="20%">💻<br/><b>CODE</b><br/><sub>stream, review, ship</sub></td>
<td align="center" width="20%">📈<br/><b>TRADE</b><br/><sub>Phoenix + Vulcan · paper first</sub></td>
<td align="center" width="20%">🔬<br/><b>RESEARCH</b><br/><sub>long-context synthesis</sub></td>
<td align="center" width="20%">🎨<br/><b>IMAGE</b><br/><sub>x402-paid gen</sub></td>
<td align="center" width="20%">🎙️<br/><b>VOICE</b><br/><sub>eve / ara / rex / sal</sub></td>
</tr>
</table>

---

## Connectors

```ts
import { createConnectors } from "@openclawd/clawd-connectors";

const connectors = createConnectors();
await connectors.helius.rpc("getBalance", ["YourPubkeyHere"]);
await connectors.dflow.callTool("open_position", { size: 10 });
```

Shared registry: [`.mcp.json`](.mcp.json) (repo root, `clawd-connectors/`, and `clawd-plugin/`).

| Server | How it loads |
| --- | --- |
| DFlow / Helius / Jupiter / Birdeye | HTTP MCP from [`clawd-connectors/`](clawd-connectors/) |
| ZK Compression | HTTP MCP `https://www.zkcompression.com/mcp` |
| clawd-mcp | `npx clawd-mcp@latest` — 9 routed domain tools + `expandResult` |
| Pump MCP | [`mcp-server/`](mcp-server/) — builds txs, does not submit |
| Solana Docs MCP | [`solana-mcp/`](solana-mcp/) → `http://localhost:8080/mcp` |

Keys live in [`.env.example`](.env.example) — copy to `.env.local`.

---

## Directory map

Canonical list. Enforced by [`MANIFEST.json`](MANIFEST.json) and `npm run verify`.

### Required packages

| Path | Layer | What it is | How to run |
|---|---|---|---|
| [`.agents`](.agents) | generated | Compiled skills from `clawd-skills` | `npm run compile-skills` — do not edit by hand |
| [`.clawd-plugin`](.clawd-plugin) | plugin | Marketplace descriptor for the plugin bundle | [`marketplace.json`](.clawd-plugin/marketplace.json) |
| [`.github`](.github) | ops | Public GitHub Actions for this repo | CI on `main` / `newnew` |
| [`clawd-agents`](clawd-agents) | agents | x402, PumpFun, Go, and Grok agent runtimes | see each subdirectory README |
| [`clawd-character`](clawd-character) | identity | Eliza-compatible Clawd persona JSON | `node --test clawd-character/tests/*.test.mjs` |
| [`clawd-code`](clawd-code) | agents | Solana-native AI coding CLI, paper-gated perps | `cd clawd-code && npm install && npm run build` |
| [`clawd-connectors`](clawd-connectors) | edge | MCP connectors: DFlow, Helius, Jupiter, Birdeye | `cd clawd-connectors && npm install && npm run build` |
| [`clawd-core`](clawd-core) | core | Identity umbrella + machine-readable catalog | `node clawd-core/src/cli.mjs catalog` |
| [`clawd-goals`](clawd-goals) | identity | Active mission files injected into agent prompts | `node --test clawd-goals/tests/*.test.mjs` |
| [`clawd-mcp`](clawd-mcp) | core | MCP server — 9 routed domain tools + `expandResult` | `npx clawd-mcp@latest` |
| [`clawd-plugin`](clawd-plugin) | plugin | Clawd Code plugin: skills + auto-start MCP | `./clawd --plugin-dir ./clawd-plugin` |
| [`clawd-router`](clawd-router) | edge | OpenAI-compatible LLM router, CLAWD gating, x402 | `cd clawd-router && npm install && npm start` |
| [`clawd-skills`](clawd-skills) | core | Canonical `SKILL.md` source | `./clawd-skills/clawd/install.sh` |
| [`clawd-tui`](clawd-tui) | agents | Terminal operator (doctor/theme) + upstream TUI | `node clawd-tui/src/cli.mjs doctor` |
| [`clawd-wallet`](clawd-wallet) | edge | Privy embedded Solana wallet, Jupiter swaps | `cd clawd-wallet && npm install && npm run build` |
| [`constitution`](constitution) | identity | Constitution + hash-attested Three On-Chain Laws | `node constitution/hash.mjs` |
| [`knowledge`](knowledge) | memory | Facts, gotchas, patterns, architecture notes | read-only |
| [`mcp-server`](mcp-server) | edge | Pump SDK MCP (builds txs, does not submit) | `npm run mcp:pump:start` |
| [`scripts`](scripts) | ops | Skill compiler, structure check, secret scan, doctor | `npm run verify` |
| [`tailclawd`](tailclawd) | ops | Operator dashboard — sessions, metrics, health | `npm run tailclawd:start` → `http://127.0.0.1:4402` |
| [`v3`](v3) | agents | Next-gen unified Clawd runtime scaffold | `./claw` or `cd v3 && npm start` |
| [`zk-primitives`](zk-primitives) | edge | Light Protocol ZK: nullifiers, Groth16, compressed state | see [`zk-primitives/README.md`](zk-primitives/README.md) |

### Also in this tree

| Path | Layer | What it is | How to run |
|---|---|---|---|
| [`.claude-plugin`](.claude-plugin) | plugin | Claude-compatible marketplace → `./clawd-plugin` | [`marketplace.json`](.claude-plugin/marketplace.json) |
| [`clawd-cli`](clawd-cli) | core | Helius account setup, DAS/RPC, staking, ZK compression | `npm install -g clawd-cli` |
| [`clawd-cursor`](clawd-cursor) | plugin | Cursor skills, rules, and MCP config | Cursor marketplace / local plugin dir |
| [`clawd-grok`](clawd-grok) | agents | Bun-native Grok runtime (default `grok-4.6`) | `cd clawd-grok && bun install && bun run dev` |
| [`clawd-perps-agent`](clawd-perps-agent) | agents | Phoenix, Vulcan, Imperial, TWAMM, Telegram | `cd clawd-perps-agent && npm install && npm run build` |
| [`membrain`](membrain) | memory | Selective memory daemon — gRPC `:9090` | `cd membrain && make build && ./bin/membraned` |
| [`solana-mcp`](solana-mcp) | edge | Solana docs MCP — RAG + canonical retrieval | `npm run mcp:solana:dev` → `http://localhost:8080/mcp` |
| [`docs`](docs) | ops | ADRs and animated SVG maps | [architecture](docs/architecture.md) |
| [`convex`](convex) | ops | Convex helpers used by gateway surfaces | package-local |
| [`outputs`](outputs) | ops | Local gallery / generated artifacts | runtime — contents gitignored |

### Root files

| File | What it is |
|---|---|
| [`claw`](claw) | Public operator launcher → `v3` runtime |
| [`clawd`](clawd) | Same operator — so `./clawd --plugin-dir ./clawd-plugin` works without a global install |
| [`.editorconfig`](.editorconfig) | Editor defaults (LF, 2-space indent) |
| [`.env.example`](.env.example) | Operator env template — copy to `.env.local` |
| [`.gitattributes`](.gitattributes) | LF normalization |
| [`.mcp.json`](.mcp.json) | Root MCP registry (DFlow, Helius, Jupiter, Birdeye, clawd-mcp) |
| [`.gitignore`](.gitignore) | Secrets, `node_modules`, build output |
| [`.npmrc`](.npmrc) | npm project config |
| [`.nvmrc`](.nvmrc) | Node 20 |
| [`AGENTS.md`](AGENTS.md) | Layer A harness for Clawd-compatible agents |
| [`CLAUDE.md`](CLAUDE.md) | Compatibility shim for runtimes that auto-load it |
| [`CLAWD.md`](CLAWD.md) | Canonical Clawd operator instructions |
| [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | Contributor Covenant |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Signed-commit guidance + `npm run verify` |
| [`glama.json`](glama.json) | Glama MCP maintainer record |
| [`LICENSE`](LICENSE) | MIT |
| [`MANIFEST.json`](MANIFEST.json) | Machine-readable package catalog |
| [`NOTICE.md`](NOTICE.md) | Upstream sources |
| [`package.json`](package.json) | Workspace scripts (`verify`, `catalog`, `stack:doctor`) |
| [`package-lock.json`](package-lock.json) | Root lockfile |
| [`README.md`](README.md) | This map |
| [`SECURITY.md`](SECURITY.md) | Vulnerability reporting + paper-default trading |
| [`versions.json`](versions.json) | Skill / prompt version pins |

<img src="docs/assets/clawd-ticker.svg" alt="Scrolling Clawd Cloud package ticker" width="100%">

---

## Identity and law

- [`constitution/`](constitution/) — never harm, earn your existence, never deceive. Spawn pipelines record `sha256(three-laws.md)`.
- [`clawd-character/`](clawd-character/) — persona JSON loaded at spawn.
- [`clawd-goals/`](clawd-goals/) — active missions (`active: true`) injected into prompts.
- [`knowledge/`](knowledge/) — operator memory.
- [`AGENTS.md`](AGENTS.md) / [`CLAWD.md`](CLAWD.md) — Layer A harness. Skills in `.agents/skills/` are Layer B.

---

## Develop

```bash
npm run stack:doctor    # plugin + MCP + operator + catalog
npm run verify          # structure + secrets + keyless tests
npm run catalog         # print the assembled Clawd Cloud map
./claw cloud
npm run tailclawd:start # http://127.0.0.1:4402
```

Docs: [architecture](docs/architecture.md) · [ADR](docs/adr/ADR-001-open-clawd-v2.md) · [publish](docs/PUBLISH.md)

When you add or rename a package, update this README in the same change. `scripts/check-structure.mjs` enforces the map.

---

## npm packages

Install from this checkout, or from npm when published. Root `clawd-cloud` stays **private** — it is the GitHub monorepo, not an npm tarball.

| Package | npm | Command |
| --- | --- | --- |
| Clawd MCP | [`clawd-mcp`](https://www.npmjs.com/package/clawd-mcp) | `npx clawd-mcp@latest` |
| Clawd CLI | [`clawd-cli`](https://www.npmjs.com/package/clawd-cli) | `npx clawd-cli@latest` |
| Connectors | [`@openclawd/clawd-connectors`](https://www.npmjs.com/package/@openclawd/clawd-connectors) | `npm i @openclawd/clawd-connectors` |
| Catalog | [`@clawd/core`](https://www.npmjs.com/package/@clawd/core) | `npx clawd-core catalog` |
| Clawd Code | [`@solana-clawd/clawd-code`](https://www.npmjs.com/package/@solana-clawd/clawd-code) | `npx @solana-clawd/clawd-code` |
| Wallet | [`@openclawd/wallet`](https://www.npmjs.com/package/@openclawd/wallet) | `npm i @openclawd/wallet` |
| Tailclawd | [`@clawd/tailclawd`](https://www.npmjs.com/package/@clawd/tailclawd) | `npx tailclawd` |
| TUI | [`@clawd/tui`](https://www.npmjs.com/package/@clawd/tui) | `npx clawd-tui` |

In-tree only (not published as their npm names from this repo): `mcp-server` (`@pump-fun/mcp-server`), `solana-mcp`, `membrain` clients, `clawd-grok`, `v3`. Use the GitHub paths.

Publish a tagged MCP release with `git tag clawd-mcp@x.y.z && git push origin clawd-mcp@x.y.z` — see [`.github/workflows/mcp-publish.yml`](.github/workflows/mcp-publish.yml).

---

## Contributing

PRs welcome on docs, connectors, Core skills, MCP tools, and stack wiring.

1. Fork → branch off `main` (or `newnew`).
2. Keep diffs small. Match nearby TypeScript / ESM style.
3. `npm run verify` and any tests for the package you touched.
4. Never commit secrets, keypairs, or live-trading flags flipped on.

See [`CONTRIBUTING.md`](CONTRIBUTING.md), [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md), and [`SECURITY.md`](SECURITY.md).

---

## License

MIT. See [`LICENSE`](LICENSE) and [`NOTICE.md`](NOTICE.md).

`constitution/CONSTITUTION.md` and `constitution/three-laws.md` are CC0 1.0.

---

<div align="center">

**Star this repo** if the stack is useful — it is the best signal that the lobster should keep molting in public.

[![Star History Chart](https://api.star-history.com/chart?repos=Solizardking/clawd-cloud&type=Date)](https://star-history.com/#Solizardking/clawd-cloud&Date)

[Clawd Code](clawd-code/) · [Connectors](clawd-connectors/) · [Plugin](clawd-plugin/) · [Issues](https://github.com/Solizardking/clawd-cloud/issues) · [$CLAWD](https://phantom.com/tokens/solana/8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=140&section=footer&text=the%20shell%20molts.%20the%20laws%20do%20not.&fontSize=18&fontColor=F7931A&animation=twinkling" width="100%" alt="" />

<sub>🦞 MIT · paper trading by default · PRs welcome</sub>

</div>
