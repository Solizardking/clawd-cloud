import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { listPackages, loadManifest, requiredPaths } from '../src/catalog.mjs';

const coreRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

describe('clawd-core catalog', () => {
  it('loads MANIFEST.json', () => {
    const manifest = loadManifest();
    assert.equal(manifest.name, 'clawd-core-ai');
    assert.ok(Array.isArray(manifest.required));
    assert.ok(manifest.required.length >= 22);
  });

  it('lists every required directory on disk', () => {
    for (const path of requiredPaths()) {
      assert.ok(existsSync(join(coreRoot, path)), `missing ${path}`);
    }
  });

  it('keeps unique package paths', () => {
    const paths = listPackages().map((p) => p.path);
    assert.equal(new Set(paths).size, paths.length);
  });
});
