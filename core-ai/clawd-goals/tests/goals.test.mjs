import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function parseGoal(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const meta = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: match[2] };
}

describe('clawd-goals', () => {
  it('parses active goals with ids', () => {
    const files = readdirSync(root).filter((f) => f.endsWith('.md') && f !== 'README.md');
    assert.ok(files.length >= 2);
    const goals = files.map((f) => parseGoal(readFileSync(join(root, f), 'utf8')));
    for (const goal of goals) {
      assert.ok(goal, 'missing frontmatter');
      assert.ok(goal.meta.id);
      assert.ok(['true', 'false'].includes(goal.meta.active));
    }
  });
});
