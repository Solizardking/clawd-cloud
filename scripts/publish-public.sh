#!/usr/bin/env bash
# Split core-ai/ into its own git history for a public GitHub repo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
git subtree split -P core-ai -b core-ai-public
echo "Branch core-ai-public now has Core AI at repo root."
echo "Push with:"
echo "  git push -u git@github.com:Solizardking/core-ai.git core-ai-public:main"
