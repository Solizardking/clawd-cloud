import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listPackages, loadManifest } from './catalog.mjs';
import { ALIASES, CAPABILITIES, COMMUNICATION_TARGETS } from './cloud-map.mjs';

const CORE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function normalize(id) {
  return String(id ?? '')
    .trim()
    .replace(/\/+$/, '');
}

function capabilityIndex() {
  const byName = new Map();
  for (const cap of Object.values(CAPABILITIES)) {
    byName.set(cap.name, cap);
    for (const alias of cap.aliases ?? []) byName.set(alias, cap);
  }
  return byName;
}

function membership(path) {
  const names = [];
  for (const cap of Object.values(CAPABILITIES)) {
    if (cap.destinations.includes(path)) names.push(cap.name);
  }
  return names;
}

export function loadCloudRegistry(root = CORE_ROOT) {
  const manifest = loadManifest(root);
  const packages = listPackages(root);
  const destinations = [];
  const byPath = new Map();
  const missingTargets = [];

  for (const pkg of packages) {
    const target = COMMUNICATION_TARGETS[pkg.path];
    if (!target || !(target.invoke || target.endpoint)) {
      missingTargets.push(pkg.path);
      continue;
    }
    const dest = {
      identity: pkg.path,
      path: pkg.path,
      layer: pkg.layer ?? 'other',
      summary: pkg.summary ?? '',
      required: (manifest.required ?? []).some((p) => p.path === pkg.path),
      target: {
        kind: target.kind,
        invoke: target.invoke ?? null,
        endpoint: resolveEndpoint(pkg.path, target),
      },
      capabilities: membership(pkg.path),
      present: existsSync(join(root, pkg.path)),
    };
    destinations.push(dest);
    byPath.set(pkg.path, dest);
  }

  const capabilities = Object.values(CAPABILITIES).map((cap) => ({
    ...cap,
    destinations: [...cap.destinations],
    present: cap.destinations.filter((id) => byPath.has(id)),
  }));

  return {
    name: 'Clawd Cloud',
    root,
    manifest,
    destinations,
    byPath,
    capabilities,
    missingTargets,
  };
}

function resolveEndpoint(path, target) {
  if (path === 'membrain') {
    return process.env.MEMBRAIN_GRPC_ENDPOINT || target.endpoint || 'localhost:9090';
  }
  if (path === 'tailclawd') {
    const host = process.env.TAILCLAWD_HOST || '127.0.0.1';
    const port = process.env.TAILCLAWD_PORT || '4402';
    return `http://${host}:${port}`;
  }
  return target.endpoint ?? null;
}

/**
 * Resolve a sender or destination identity: path, alias, or capability name.
 * Capability names resolve to the capability's primary destination.
 */
export function resolveIdentity(registry, raw) {
  const id = normalize(raw);
  if (!id) return null;

  const caps = capabilityIndex();
  if (caps.has(id)) {
    const cap = caps.get(id);
    const dest = registry.byPath.get(cap.primary);
    if (!dest) return null;
    return { ...dest, resolvedCapability: cap.name };
  }

  const aliased = ALIASES[id] ?? id;
  if (caps.has(aliased)) {
    const cap = caps.get(aliased);
    const dest = registry.byPath.get(cap.primary);
    if (!dest) return null;
    return { ...dest, resolvedCapability: cap.name };
  }

  const dest = registry.byPath.get(aliased);
  if (!dest) return null;
  return { ...dest, resolvedCapability: undefined };
}

export function listCapabilities(registry = loadCloudRegistry()) {
  return registry.capabilities;
}

export function formatCloudStatus(registry = loadCloudRegistry()) {
  const lines = [
    'Clawd Cloud',
    'Complete harness for Solana and blockchain-native financial agents.',
    '',
    `Destinations: ${registry.destinations.length}`,
    '',
  ];

  const grouped = new Map();
  for (const dest of registry.destinations) {
    const layer = dest.layer ?? 'other';
    if (!grouped.has(layer)) grouped.set(layer, []);
    grouped.get(layer).push(dest);
  }

  for (const [layer, dests] of grouped) {
    lines.push(`[${layer}]`);
    for (const dest of dests) {
      const route = dest.target.endpoint || dest.target.invoke;
      lines.push(`  ${dest.path.padEnd(22)} ${dest.target.kind.padEnd(12)} ${route}`);
    }
    lines.push('');
  }

  lines.push('Capabilities / routes');
  for (const cap of registry.capabilities) {
    const alias = cap.aliases?.length ? ` (${cap.aliases.join(', ')})` : '';
    lines.push(`  ${cap.name}${alias}`);
    lines.push(`    ${cap.destinations.join(', ')}  → ${cap.primary}`);
  }
  lines.push('');
  lines.push('Route: ./claw route <from> <to> <message>');
  lines.push('Status: ./claw cloud');
  return `${lines.join('\n')}\n`;
}
