# Clawd Cloud

Enterprise GitHub deploy of **Clawd Core AI**.

Application code, skills, MCP servers, wallets, and agent runtimes live in [`core-ai/`](./core-ai). That folder is the product. This repository root is the GitHub control plane: license, security policy, Actions, and the catalog check that must stay green before merge.

```text
clawd-cloud/
├── .github/          CI, Dependabot, issue/PR templates
├── core-ai/          Clawd Core stack (mapped in core-ai/README.md)
├── LICENSE           MIT
├── SECURITY.md       Private vulnerability reporting
└── NOTICE.md         Upstream attribution
```

## Verify

```bash
git clone https://github.com/Solizardking/clawd-cloud.git
cd clawd-cloud
npm run verify
```

Read the full package map: [`core-ai/README.md`](./core-ai/README.md).
