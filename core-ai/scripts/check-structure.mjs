#!/usr/bin/env node
/**
 * Validate that every MANIFEST package exists and is mapped in README.md.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'MANIFEST.json'), 'utf8'));
const readme = readFileSync(join(root, 'README.md'), 'utf8');
const required = manifest.required ?? [];
const additional = manifest.additional ?? [];
const failures = [];

function isMapped(path) {
  const candidates = [
    `\`${path}\``,
    `./${path}`,
    `](${path}`,
    `](./${path}`,
    `| ${path} |`,
    `| \`${path}\` |`,
  ];
  return candidates.some((c) => readme.includes(c)) || readme.includes(path);
}

function checkEntry(entry, requiredFlag) {
  const abs = join(root, entry.path);
  if (!existsSync(abs)) {
    failures.push(`${requiredFlag ? 'REQUIRED' : 'OPTIONAL'} missing path: ${entry.path}`);
    return;
  }
  const st = statSync(abs);
  if (!st.isDirectory()) {
    failures.push(`${entry.path} exists but is not a directory`);
  }
  if (!isMapped(entry.path)) {
    failures.push(`README does not map directory: ${entry.path}`);
  }
}

for (const entry of required) checkEntry(entry, true);
for (const entry of additional) checkEntry(entry, false);

const files = manifest.files ?? [];
for (const rel of files) {
  const abs = join(root, rel);
  if (!existsSync(abs)) {
    failures.push(`REQUIRED missing file: ${rel}`);
    continue;
  }
  if (statSync(abs).isDirectory()) {
    failures.push(`${rel} should be a file`);
  }
  if (!isMapped(rel)) {
    failures.push(`README does not map file: ${rel}`);
  }
}

if (failures.length) {
  console.error('Structure check failed:\n' + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}
console.log(
  `Structure OK — ${required.length} packages, ${additional.length} additional, ${files.length} root files mapped.`,
);
