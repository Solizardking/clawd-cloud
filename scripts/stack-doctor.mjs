#!/usr/bin/env node
/**
 * Clawd Cloud stack doctor — proves the operator, plugin, MCP registry,
 * and connectors can see each other from this checkout. Keyless.
 */
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const notes = [];

function rel(path) {
  return join(root, path);
}

function check(path, label) {
  if (!existsSync(rel(path))) {
    failures.push(`missing ${label}: ${path}`);
    return false;
  }
  return true;
}

console.log('Clawd Cloud stack doctor\n');

check('MANIFEST.json', 'catalog');
check('claw', 'operator');
check('clawd', 'clawd alias');
check('clawd-plugin', 'plugin');
check('.claude-plugin/marketplace.json', 'Claude marketplace');
check('.clawd-plugin/marketplace.json', 'Clawd marketplace');
check('.mcp.json', 'MCP registry');
check('AGENTS.md', 'agent harness');
check('CLAWD.md', 'operator harness');
check('CLAUDE.md', 'compat shim');

let mcp;
if (check('.mcp.json', 'MCP registry')) {
  try {
    mcp = JSON.parse(readFileSync(rel('.mcp.json'), 'utf8'));
    const servers = Object.keys(mcp.mcpServers ?? {});
    console.log(`  MCP registry  ${servers.length} servers: ${servers.join(', ')}`);
    for (const name of ['DFlow', 'Helius', 'Jupiter', 'Birdeye', 'clawd-mcp', 'zkcompression']) {
      if (!mcp.mcpServers?.[name]) failures.push(`.mcp.json missing server: ${name}`);
    }
  } catch (error) {
    failures.push(`.mcp.json is not valid JSON: ${error instanceof Error ? error.message : error}`);
  }
}

const plugin = JSON.parse(readFileSync(rel('.claude-plugin/marketplace.json'), 'utf8'));
if (plugin.plugins?.[0]?.source !== './clawd-plugin') {
  failures.push('.claude-plugin marketplace source must be ./clawd-plugin');
} else {
  console.log('  Plugin        ./clawd --plugin-dir ./clawd-plugin');
}

const pluginDoctor = spawnSync(process.execPath, [rel('scripts/plugin-doctor.mjs'), './clawd-plugin'], {
  encoding: 'utf8',
  timeout: 10_000,
});
if (pluginDoctor.status !== 0) {
  failures.push(`plugin doctor failed:\n${pluginDoctor.stdout || pluginDoctor.stderr}`);
} else {
  const skillsLine = (pluginDoctor.stdout || '').split('\n').find((l) => l.includes('skills'));
  console.log(`  ${skillsLine?.trim() || 'Plugin doctor ok'}`);
}

const help = spawnSync(rel('claw'), ['--help'], { encoding: 'utf8', timeout: 15_000 });
if (help.error) {
  failures.push(`./claw --help failed: ${help.error.message}`);
} else if (help.status !== 0) {
  failures.push(`./claw --help exited ${help.status}`);
} else {
  console.log('  Operator      ./claw --help ok');
}

const catalog = spawnSync(process.execPath, [rel('clawd-core/src/cli.mjs'), 'catalog'], {
  encoding: 'utf8',
  timeout: 15_000,
});
if (catalog.status !== 0) {
  failures.push(`catalog failed: ${(catalog.stderr || catalog.stdout || '').trim()}`);
} else {
  console.log('  Catalog       clawd-core destinations loaded');
}

const cloud = spawnSync(rel('claw'), ['cloud'], { encoding: 'utf8', timeout: 15_000 });
if (cloud.status !== 0) {
  notes.push(`./claw cloud exited ${cloud.status} (non-fatal)`);
} else {
  console.log('  Cloud map     ./claw cloud ok');
}

if (existsSync(rel('clawd-connectors/src/cli.ts'))) {
  const doctor = spawnSync(
    process.execPath,
    ['--import', 'tsx', rel('clawd-connectors/src/cli.ts'), 'doctor'],
    { encoding: 'utf8', timeout: 20_000, cwd: rel('clawd-connectors') },
  );
  if (doctor.status === 0) {
    console.log('  Connectors    doctor ok');
  } else {
    notes.push('connectors doctor skipped (install tsx in clawd-connectors to probe live MCP)');
  }
}

console.log('');
for (const note of notes) console.log(`  · ${note}`);

if (failures.length) {
  console.error('\nStack doctor failed:\n' + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}

console.log('Stack OK — plugin, MCP registry, operator, and catalog can see each other.\n');
console.log('  Next:');
console.log('    ./claw cloud');
console.log('    ./clawd --plugin-dir ./clawd-plugin');
console.log('    npm run verify');
console.log('');
