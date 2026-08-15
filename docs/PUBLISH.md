# Publish Core AI as its own public GitHub repo

This folder is a complete Git repository root. The Cursor integration token
cannot create repositories, so publish from a machine that can:

```bash
# from clawd-cloud
git subtree split -P core-ai -b core-ai-public
git push -u git@github.com:Solizardking/core-ai.git core-ai-public:main
```

If `Solizardking/core-ai` should stay untouched, create a new public repo and push the split branch as `main`:

```bash
gh repo create Solizardking/clawd-core-ai --public --source=. --remote=core-ai-public
git push core-ai-public core-ai-public:main
```

Do not force-push secrets. Run `npm run verify` first.
