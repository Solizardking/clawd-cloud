import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { THREE_LAWS_SHA256 } from '../hash.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('constitution', () => {
  it('ships the three on-chain laws', () => {
    const text = readFileSync(join(root, 'three-laws.md'), 'utf8');
    assert.match(text, /On-Chain Law I/);
    assert.match(text, /Never harm/);
    assert.match(text, /Earn your existence/);
    assert.match(text, /Never deceive/);
  });

  it('produces a stable sha256 for three-laws.md', () => {
    assert.equal(THREE_LAWS_SHA256.length, 64);
    assert.match(THREE_LAWS_SHA256, /^[a-f0-9]{64}$/);
  });
});
