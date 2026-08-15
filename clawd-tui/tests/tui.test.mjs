import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { doctor, pickWaitingPhrase, theme } from '../src/index.mjs';

describe('clawd-tui', () => {
  it('cycles waiting phrases', () => {
    assert.equal(pickWaitingPhrase(0), 'flibbertigibbeting');
    assert.equal(pickWaitingPhrase(10), 'kerfuffling');
  });

  it('reports env presence without values', () => {
    const report = doctor({ HELIUS_API_KEY: 'should-not-leak', NODE_ENV: 'test' });
    assert.equal(report.env.HELIUS_API_KEY, true);
    assert.equal(JSON.stringify(report).includes('should-not-leak'), false);
  });

  it('exposes Solana theme tokens', () => {
    assert.equal(theme.purple, '#9945FF');
    assert.equal(theme.green, '#14F195');
  });
});
