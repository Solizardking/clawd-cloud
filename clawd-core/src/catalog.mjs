import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CORE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadManifest(root = CORE_ROOT) {
  return JSON.parse(readFileSync(join(root, 'MANIFEST.json'), 'utf8'));
}

export function listPackages(root = CORE_ROOT) {
  const manifest = loadManifest(root);
  return [...(manifest.required ?? []), ...(manifest.additional ?? [])];
}

export function packagesByLayer(root = CORE_ROOT) {
  const grouped = {};
  for (const pkg of listPackages(root)) {
    const layer = pkg.layer ?? 'other';
    grouped[layer] ??= [];
    grouped[layer].push(pkg);
  }
  return grouped;
}

export function requiredPaths(root = CORE_ROOT) {
  return (loadManifest(root).required ?? []).map((p) => p.path);
}
