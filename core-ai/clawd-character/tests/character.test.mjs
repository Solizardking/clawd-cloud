import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['schema.json', 'package.json']);

function assertNamed(value, label) {
  if (Array.isArray(value)) {
    assert.ok(value.length > 0, `${label} empty array`);
    for (const item of value) {
      assert.ok(item && (item.name || item.id), `${label} entry missing name/id`);
    }
    return;
  }
  assert.ok(value && (value.name || value.id), `${label} missing name`);
}

describe('clawd-character', () => {
  it('ships a named Clawd persona', () => {
    const clawd = JSON.parse(readFileSync(join(root, 'clawd.json'), 'utf8'));
    assert.equal(clawd.name, 'Clawd');
    assert.ok(Array.isArray(clawd.bio) ? clawd.bio.length > 0 : clawd.bio);
  });

  it('parses every character JSON document', () => {
    const files = readdirSync(root).filter((f) => f.endsWith('.json') && !skip.has(f));
    assert.ok(files.length >= 1);
    for (const file of files) {
      const doc = JSON.parse(readFileSync(join(root, file), 'utf8'));
      assertNamed(doc, file);
    }
  });
});
