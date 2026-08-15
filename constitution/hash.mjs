#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const bytes = readFileSync(join(root, 'three-laws.md'));
const digest = createHash('sha256').update(bytes).digest('hex');
export const THREE_LAWS_SHA256 = digest;
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log(digest);
}
