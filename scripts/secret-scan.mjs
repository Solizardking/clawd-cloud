#!/usr/bin/env node
/**
 * Fail if tracked files look like live secrets. Allows .env.example placeholders.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const patterns = [
  { name: 'private-key-block', re: /-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----/ },
  { name: 'solana-id-array', re: /"private_key"\s*:\s*"/i },
  { name: 'generic-secret-assignment', re: /\b(AWS_SECRET_ACCESS_KEY|OPENAI_API_KEY|XAI_API_KEY|HELIUS_API_KEY|ANTHROPIC_API_KEY)\s*=\s*['\"][A-Za-z0-9_\-]{16,}/ },
];

const skip = [
  /\/\.git\//,
  /node_modules\//,
  /\/dist\//,
  /\.example$/,
  /secret-scan\.mjs$/,
  /SECURITY\.md$/,
  /README\.md$/,
];

let files;
try {
  files = execSync('git ls-files -c -o --exclude-standard', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
} catch {
  files = execSync('find . -type f', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter((f) => f && !f.includes('node_modules') && !f.includes('/.git/'));
}

const hits = [];
for (const file of files) {
  if (skip.some((re) => re.test(file))) continue;
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (text.length > 2_000_000) continue;
  for (const { name, re } of patterns) {
    if (re.test(text)) hits.push(`${file}: ${name}`);
  }
}

if (hits.length) {
  console.error('Secret scan failed:\n' + hits.map((h) => `  - ${h}`).join('\n'));
  process.exit(1);
}
console.log(`Secret scan OK — ${files.length} files checked.`);
