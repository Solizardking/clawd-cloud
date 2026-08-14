#!/usr/bin/env node
import { doctor, pickWaitingPhrase, theme } from './index.mjs';

const command = process.argv[2] ?? 'help';

if (command === 'help' || command === '--help' || command === '-h') {
  console.log(`clawd-tui <doctor|theme|help>

  doctor   Report Node version and whether sensitive env vars are set
  theme    Print Solana theme tokens
`);
  process.exit(0);
}

if (command === 'theme') {
  console.log(JSON.stringify(theme, null, 2));
  process.exit(0);
}

if (command === 'doctor') {
  const report = doctor();
  console.log(`node ${report.node} ${report.nodeOk ? 'ok' : 'need >= 20'}`);
  for (const [name, present] of Object.entries(report.env)) {
    console.log(`${name}=${present ? 'set' : 'missing'}`);
  }
  console.log(`status ${pickWaitingPhrase(0)}`);
  process.exit(report.nodeOk ? 0 : 1);
}

console.error(`unknown command: ${command}`);
process.exit(1);
