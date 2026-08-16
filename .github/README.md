# GitHub Actions

GitHub Actions only reads `.github/` at the **repository root**.

Workflows for [Solizardking/clawd-cloud](https://github.com/Solizardking/clawd-cloud) live in [`workflows/`](workflows/).

| Workflow | What it does |
| --- | --- |
| `ci.yml` | Structure, secret scan, keyless tests, stack doctor, clawd-mcp |
| `test.yml` | clawd-mcp package tests |
| `mcp-publish.yml` / `mcp-release.yml` | MCP package publish |
| `verify-signed-commits.yml` | Maintainer signature check |
| `sync-check.yml` | Generated-skill sync |
