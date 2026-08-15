import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('clawd-connectors', () => {
  it('is a named MCP connector package', () => {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    assert.equal(pkg.name, '@openclawd/clawd-connectors');
    assert.ok(existsSync(join(root, 'src/config.ts')));
    assert.ok(existsSync(join(root, '.mcp.json')));
  });

  it('does not document live secrets', () => {
    const readme = readFileSync(join(root, 'README.md'), 'utf8');
    assert.match(readme, /HELIUS_API_KEY/);
    assert.equal(readme.includes('helius_'), false);
  });
});
