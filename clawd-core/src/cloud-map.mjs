/**
 * Communication targets and named capabilities for every MANIFEST package.
 * Layer + summary come from the live MANIFEST; this file only adds how
 * another package reaches each destination.
 */

export const COMMUNICATION_TARGETS = {
  '.agents': {
    kind: 'compile',
    invoke: 'npm run compile-skills',
  },
  '.clawd-plugin': {
    kind: 'plugin',
    invoke: 'read .clawd-plugin/marketplace.json',
  },
  '.claude-plugin': {
    kind: 'plugin',
    invoke: 'read .claude-plugin/marketplace.json',
  },
  '.github': {
    kind: 'ops',
    invoke: 'read .github/workflows',
  },
  'clawd-agents': {
    kind: 'spawn',
    invoke: 'see clawd-agents/*/README.md',
  },
  'clawd-character': {
    kind: 'read',
    invoke: 'node --test clawd-character/tests/*.test.mjs',
  },
  'clawd-code': {
    kind: 'spawn',
    invoke: './claw legacy',
  },
  'clawd-connectors': {
    kind: 'cli',
    invoke: 'npx --prefix clawd-connectors tsx src/cli.ts',
  },
  'clawd-core': {
    kind: 'catalog',
    invoke: 'node clawd-core/src/cli.mjs catalog',
  },
  'clawd-goals': {
    kind: 'read',
    invoke: 'node --test clawd-goals/tests/*.test.mjs',
  },
  'clawd-mcp': {
    kind: 'mcp-stdio',
    invoke: 'npx clawd-mcp@latest',
  },
  'clawd-plugin': {
    kind: 'plugin',
    invoke: './clawd --plugin-dir ./clawd-plugin',
  },
  'clawd-router': {
    kind: 'http',
    invoke: 'npm --prefix clawd-router start',
  },
  'clawd-skills': {
    kind: 'compile',
    invoke: './clawd-skills/clawd/install.sh',
  },
  'clawd-tui': {
    kind: 'cli',
    invoke: 'node clawd-tui/src/cli.mjs doctor',
  },
  'clawd-wallet': {
    kind: 'cli',
    invoke: 'npx --prefix clawd-wallet tsx src/cli.ts',
  },
  constitution: {
    kind: 'read',
    invoke: 'node constitution/hash.mjs',
  },
  knowledge: {
    kind: 'read',
    invoke: 'read knowledge/',
  },
  'mcp-server': {
    kind: 'mcp-stdio',
    invoke: 'npm run mcp:pump:start',
  },
  scripts: {
    kind: 'ops',
    invoke: 'npm run verify',
  },
  tailclawd: {
    kind: 'http',
    invoke: 'npm run tailclawd:start',
    endpoint: 'http://127.0.0.1:4402',
  },
  v3: {
    kind: 'spawn',
    invoke: './claw',
  },
  'zk-primitives': {
    kind: 'spawn',
    invoke: 'read zk-primitives/README.md',
  },
  'clawd-cli': {
    kind: 'cli',
    invoke: 'npx --prefix clawd-cli tsx bin/clawd-cli.ts',
  },
  'clawd-cursor': {
    kind: 'plugin',
    invoke: 'read clawd-cursor/README.md',
  },
  'clawd-grok': {
    kind: 'spawn',
    invoke: 'bun --cwd clawd-grok run dev',
  },
  'clawd-perps-agent': {
    kind: 'spawn',
    invoke: 'npm --prefix clawd-perps-agent run start',
  },
  membrain: {
    kind: 'grpc',
    invoke: 'make -C membrain build && membrain/bin/membraned',
    endpoint: 'localhost:9090',
  },
  'solana-mcp': {
    kind: 'mcp-http',
    invoke: 'npm run mcp:solana:dev',
    endpoint: 'http://localhost:8080/mcp',
  },
  docs: {
    kind: 'read',
    invoke: 'read docs/',
  },
  convex: {
    kind: 'read',
    invoke: 'read convex/',
  },
  outputs: {
    kind: 'read',
    invoke: 'read outputs/',
  },
};

/**
 * Named financial-agent capabilities. A capability is addressable without
 * live RPC, signing, or a funded wallet — it names in-tree destinations.
 */
export const CAPABILITIES = {
  chain: {
    name: 'chain',
    aliases: ['mcp'],
    destinations: ['clawd-mcp', 'clawd-connectors', 'solana-mcp', 'mcp-server'],
    primary: 'clawd-mcp',
    summary: 'Chain and MCP surfaces (Helius, connectors, Solana docs, Pump)',
  },
  wallet: {
    name: 'wallet',
    aliases: ['pay'],
    destinations: ['clawd-wallet', 'clawd-router'],
    primary: 'clawd-wallet',
    summary: 'Wallet and pay routing (Privy/Jupiter + LLM x402 router)',
  },
  perps: {
    name: 'perps',
    aliases: ['trade'],
    destinations: ['clawd-perps-agent', 'v3'],
    primary: 'clawd-perps-agent',
    summary: 'Perps agents plus the v3 paper-gated trade surface',
  },
  memory: {
    name: 'memory',
    aliases: [],
    destinations: ['membrain'],
    primary: 'membrain',
    summary: 'Selective memory daemon (membraned gRPC)',
  },
};

/** Sender / destination aliases that resolve to a registered identity or capability. */
export const ALIASES = {
  operator: 'v3',
  claw: 'v3',
  clawd: 'v3',
  core: 'clawd-core',
  catalog: 'clawd-core',
};

export const ADAPTER_KINDS = [
  'compile',
  'plugin',
  'ops',
  'spawn',
  'read',
  'cli',
  'catalog',
  'mcp-stdio',
  'mcp-http',
  'http',
  'grpc',
];
