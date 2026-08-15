import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { loadManifest } from '../src/catalog.mjs';
import { CAPABILITIES } from '../src/cloud-map.mjs';
import {
  formatCloudStatus,
  loadCloudRegistry,
  resolveIdentity,
} from '../src/registry.mjs';
import { createDefaultAdapters, createInProcessAdapters, detectBlocker } from '../src/adapters.mjs';
import { routeMessage } from '../src/router.mjs';

const coreRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

describe('Clawd Cloud registry', () => {
  it('registers every MANIFEST required+additional path with a communication target', () => {
    const manifest = loadManifest();
    const expected = [...(manifest.required ?? []), ...(manifest.additional ?? [])];
    const registry = loadCloudRegistry();

    assert.equal(registry.missingTargets.length, 0, `missing targets: ${registry.missingTargets}`);
    assert.equal(registry.destinations.length, expected.length);

    for (const pkg of expected) {
      const dest = registry.byPath.get(pkg.path);
      assert.ok(dest, `registry omitted ${pkg.path}`);
      assert.equal(dest.path, pkg.path);
      assert.equal(dest.layer, pkg.layer);
      assert.ok(dest.target, `${pkg.path} has no target`);
      assert.ok(dest.target.kind, `${pkg.path} target.kind missing`);
      assert.ok(
        dest.target.invoke || dest.target.endpoint,
        `${pkg.path} has neither invoke nor endpoint`,
      );
      assert.ok(existsSync(join(coreRoot, pkg.path)), `path missing on disk: ${pkg.path}`);
    }
  });

  it('exposes financial-agent capabilities to in-tree destinations', () => {
    const registry = loadCloudRegistry();
    const expected = {
      chain: ['clawd-mcp', 'clawd-connectors', 'solana-mcp', 'mcp-server'],
      wallet: ['clawd-wallet', 'clawd-router'],
      perps: ['clawd-perps-agent', 'v3'],
      memory: ['membrain'],
    };

    for (const [name, dests] of Object.entries(expected)) {
      const cap = registry.capabilities.find((c) => c.name === name);
      assert.ok(cap, `capability ${name} missing`);
      assert.deepEqual(cap.destinations, dests);
      assert.ok(registry.byPath.has(cap.primary), `${name} primary ${cap.primary} not registered`);
      for (const id of dests) {
        assert.ok(registry.byPath.has(id), `${name} destination ${id} not registered`);
      }
    }

    assert.equal(resolveIdentity(registry, 'mcp').identity, CAPABILITIES.chain.primary);
    assert.equal(resolveIdentity(registry, 'pay').identity, CAPABILITIES.wallet.primary);
    assert.equal(resolveIdentity(registry, 'trade').identity, CAPABILITIES.perps.primary);
    assert.equal(resolveIdentity(registry, 'operator').identity, 'v3');
  });
});

describe('Clawd Cloud router', () => {
  const registry = loadCloudRegistry();
  const STATUSES = new Set(['delivered', 'unreachable', 'unsupported']);

  async function routed(sender, destination, message, adapters) {
    return routeMessage({ sender, destination, message }, { registry, adapters });
  }

  it('delivers representative pairs across layer groups through the shipped router', async () => {
    const inbox = [];
    const adapters = createInProcessAdapters({ inbox });

    const pairs = [
      ['v3', 'clawd-code', 'agents: spawn coding CLI'],
      ['operator', 'clawd-character', 'identity: load persona'],
      ['clawd-code', 'clawd-mcp', 'chain: getBalance'],
      ['clawd-code', 'clawd-wallet', 'wallet: quote swap'],
      ['clawd-code', 'membrain', 'memory: recall last trade'],
      ['v3', 'tailclawd', 'ops: health'],
    ];

    for (const [sender, destination, message] of pairs) {
      const result = await routed(sender, destination, message, adapters);
      assert.equal(result.status, 'delivered', `${sender} → ${destination}: ${result.reason}`);
      const live = resolveIdentity(registry, destination);
      assert.equal(result.destination, live.identity);
      assert.equal(result.target.kind, live.target.kind);
      assert.equal(result.target.invoke, live.target.invoke);
    }

    assert.equal(inbox.length, pairs.length);
    assert.ok(inbox.every((row) => row.from && row.to && row.message));
  });

  it('routes named financial-agent capabilities without live RPC or wallets', async () => {
    const inbox = [];
    const adapters = createInProcessAdapters({ inbox });

    const capabilities = [
      ['chain', CAPABILITIES.chain.primary],
      ['mcp', CAPABILITIES.chain.primary],
      ['wallet', CAPABILITIES.wallet.primary],
      ['pay', CAPABILITIES.wallet.primary],
      ['perps', CAPABILITIES.perps.primary],
      ['trade', CAPABILITIES.perps.primary],
      ['memory', CAPABILITIES.memory.primary],
    ];

    for (const [name, primary] of capabilities) {
      const result = await routed('v3', name, `capability ${name}`, adapters);
      assert.equal(result.status, 'delivered', `${name}: ${result.reason}`);
      assert.equal(result.destination, primary);
      assert.ok(result.capability, `${name} did not record a capability`);
      const live = registry.byPath.get(primary);
      assert.equal(result.target.invoke, live.target.invoke);
    }
  });

  it('returns unsupported for unknown identities and empty messages', async () => {
    const adapters = createInProcessAdapters();
    const unknown = await routed('v3', 'not-a-cloud-destination', 'ping', adapters);
    assert.equal(unknown.status, 'unsupported');
    assert.match(unknown.reason, /unknown destination/);

    const empty = await routeMessage(
      { sender: 'v3', destination: 'clawd-mcp', message: '' },
      { registry, adapters },
    );
    assert.equal(empty.status, 'unsupported');
    assert.match(empty.reason, /message/);
  });

  it('returns unreachable when the adapter declines a registered destination', async () => {
    const adapters = createInProcessAdapters({ fail: ['membrain'] });
    const result = await routed('clawd-code', 'membrain', 'recall', adapters);
    assert.equal(result.status, 'unreachable');
    assert.equal(result.destination, 'membrain');
    assert.ok(result.reason);
    assert.equal(result.target.kind, registry.byPath.get('membrain').target.kind);
  });

  it('default adapters produce a structured status from the live map', async () => {
    const adapters = createDefaultAdapters({ root: registry.root });
    const mcp = await routed('v3', 'clawd-mcp', 'addressable ping', adapters);
    assert.ok(STATUSES.has(mcp.status));
    assert.equal(mcp.destination, 'clawd-mcp');
    assert.equal(mcp.target.invoke, registry.byPath.get('clawd-mcp').target.invoke);

    const perps = await routed('v3', 'perps', 'paper status', adapters);
    assert.ok(STATUSES.has(perps.status));
    assert.equal(perps.destination, CAPABILITIES.perps.primary);
    const blocker = detectBlocker(registry.root, registry.byPath.get('clawd-perps-agent'));
    if (blocker) {
      assert.equal(perps.status, 'unreachable');
      assert.equal(perps.reason, blocker);
    }
  });
});

describe('Clawd Cloud status surface', () => {
  it('prints destinations and routes from the live registry', () => {
    const registry = loadCloudRegistry();
    const text = formatCloudStatus(registry);
    assert.match(text, /Clawd Cloud/);
    assert.match(text, /Route: \.\/claw route/);
    for (const dest of registry.destinations) {
      assert.ok(text.includes(dest.path), `status omitted ${dest.path}`);
    }
    for (const cap of registry.capabilities) {
      assert.ok(text.includes(cap.name), `status omitted capability ${cap.name}`);
    }
  });
});
