import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createTailclawdServer } from '../src/server.mjs';

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });
}

describe('tailclawd', () => {
  it('serves health and catalog', async () => {
    const server = createTailclawdServer();
    const port = await listen(server);
    try {
      const health = await fetch(`http://127.0.0.1:${port}/health`);
      assert.equal(health.status, 200);
      const healthBody = await health.json();
      assert.equal(healthBody.ok, true);
      assert.equal(healthBody.service, 'tailclawd');

      const catalog = await fetch(`http://127.0.0.1:${port}/v1/catalog`);
      assert.equal(catalog.status, 200);
      const body = await catalog.json();
      assert.equal(body.name, 'clawd-core-ai');
      assert.ok(body.required.some((p) => p.path === 'tailclawd'));
    } finally {
      server.close();
    }
  });
});
