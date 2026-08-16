#!/usr/bin/env node
/**
 * Doctor a Clawd plugin directory (skills + MCP registry + plugin.json).
 * Used by `./clawd --plugin-dir` and `npm run stack:doctor`. Keyless.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

export function doctorPlugin(pluginDir = './clawd-plugin', root = repoRoot) {
  const abs = resolve(root, pluginDir);
  const failures = [];
  const skills = [];
  let name = '(unknown)';
  let servers = [];

  if (!existsSync(abs) || !statSync(abs).isDirectory()) {
    return { ok: false, abs, name, skills, servers, failures: [`plugin directory missing: ${pluginDir}`] };
  }

  const manifestPaths = [
    join(abs, '.clawd-plugin', 'plugin.json'),
    join(abs, '.claude-plugin', 'plugin.json'),
    join(abs, 'plugin.json'),
  ];
  const manifestPath = manifestPaths.find((p) => existsSync(p));
  if (!manifestPath) {
    failures.push('plugin.json missing (.clawd-plugin/plugin.json)');
  } else {
    try {
      const json = JSON.parse(readFileSync(manifestPath, 'utf8'));
      name = json.name || name;
    } catch (error) {
      failures.push(`plugin.json invalid: ${error instanceof Error ? error.message : error}`);
    }
  }

  const skillsRoot = join(abs, 'skills');
  if (!existsSync(skillsRoot)) {
    failures.push('skills/ missing');
  } else {
    for (const entry of readdirSync(skillsRoot)) {
      const skillMd = join(skillsRoot, entry, 'SKILL.md');
      if (existsSync(skillMd)) skills.push(entry);
    }
    if (skills.length === 0) failures.push('no SKILL.md files under skills/');
  }

  const mcpPath = join(abs, '.mcp.json');
  if (!existsSync(mcpPath)) {
    failures.push('.mcp.json missing');
  } else {
    try {
      const mcp = JSON.parse(readFileSync(mcpPath, 'utf8'));
      servers = Object.keys(mcp.mcpServers ?? {});
      if (servers.length === 0) failures.push('.mcp.json has no mcpServers');
    } catch (error) {
      failures.push(`.mcp.json invalid: ${error instanceof Error ? error.message : error}`);
    }
  }

  return { ok: failures.length === 0, abs, name, skills, servers, failures };
}

export function formatPluginDoctor(result, pluginDir = './clawd-plugin') {
  const lines = [
    `Clawd plugin  ${pluginDir}`,
    `  path    ${result.abs}`,
    `  name    ${result.name}`,
    `  skills  ${result.skills.length ? result.skills.join(', ') : '(none)'}`,
    `  mcp     ${result.servers.length ? result.servers.join(', ') : '(none)'}`,
    `  host    ./clawd --plugin-dir ${pluginDir}`,
  ];
  if (!result.ok) {
    lines.push('');
    lines.push('Plugin doctor failed:');
    for (const f of result.failures) lines.push(`  - ${f}`);
  }
  return lines.join('\n') + '\n';
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2] || './clawd-plugin';
  const result = doctorPlugin(dir);
  process.stdout.write(formatPluginDoctor(result, dir));
  process.exit(result.ok ? 0 : 1);
}
