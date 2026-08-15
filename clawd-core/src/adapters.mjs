import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

function nodeMajor() {
  return Number.parseInt(process.versions.node.split('.')[0] || '0', 10);
}

export function detectBlocker(root, destination) {
  const abs = join(root, destination.path);
  if (!existsSync(abs)) {
    return `destination path missing: ${destination.path}`;
  }

  if (destination.identity === 'mcp-server' && nodeMajor() >= 25) {
    return `mcp-server MCP SDK is not compatible with Node ${process.versions.node}`;
  }

  if (destination.identity === 'clawd-perps-agent') {
    const pkgFile = join(root, 'clawd-perps-agent', 'package.json');
    if (!existsSync(pkgFile)) return 'clawd-perps-agent package.json missing';
    const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'));
    const dep = pkg.dependencies?.['@openclawdsolana/clawd-perps'];
    if (typeof dep === 'string' && dep.startsWith('file:')) {
      const rel = dep.slice('file:'.length);
      const depAbs = resolve(join(root, 'clawd-perps-agent'), rel);
      if (!existsSync(depAbs)) {
        return `missing out-of-tree file: dependency ${rel}`;
      }
    }
  }

  return null;
}

async function probeEndpoint(target, timeoutMs = 250) {
  const endpoint = target.endpoint;
  if (!endpoint) return false;
  if (target.kind === 'grpc') {
    const url = endpoint.includes('://') ? endpoint : `http://${endpoint}`;
    return probeHttp(url, timeoutMs);
  }
  if (target.kind === 'http' || target.kind === 'mcp-http') {
    return probeHttp(endpoint, timeoutMs);
  }
  return false;
}

async function probeHttp(url, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { method: 'GET', signal: ctrl.signal });
    return res.ok || res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Default adapters: deliver in-process when the destination is addressable.
 * Known blockers (missing tree, Node/MCP mismatch) return unreachable.
 * `--live` probes HTTP/gRPC endpoints; down endpoints are unreachable.
 */
export function createDefaultAdapters({ root, live = false } = {}) {
  const deliver = async ({ sender, destination, message }) => {
    const blocker = detectBlocker(root, destination);
    if (blocker) return { ok: false, reason: blocker };

    if (live && destination.target.endpoint) {
      const reachable = await probeEndpoint(destination.target);
      if (!reachable) {
        return { ok: false, reason: `endpoint not reachable: ${destination.target.endpoint}` };
      }
    }

    return {
      ok: true,
      reply: {
        fabric: live ? 'live' : 'addressable',
        invoke: destination.target.invoke,
        endpoint: destination.target.endpoint,
        from: sender.identity,
        accepted: String(message).slice(0, 240),
      },
    };
  };

  return { default: { deliver } };
}

/**
 * In-process adapters for tests: same deliver() contract, no spawn/HTTP/gRPC.
 * Optional `fail` identities return unreachable so the shipped router can be
 * driven through every structured status.
 */
export function createInProcessAdapters(options = {}) {
  const fail = new Set(options.fail ?? []);
  const inbox = options.inbox ?? [];

  const deliver = async ({ sender, destination, message }) => {
    if (fail.has(destination.identity) || fail.has(destination.target.kind)) {
      return {
        ok: false,
        reason: options.reason ?? `in-process adapter declined ${destination.identity}`,
      };
    }
    const record = {
      from: sender.identity,
      to: destination.identity,
      kind: destination.target.kind,
      capability: destination.resolvedCapability ?? null,
      message,
    };
    inbox.push(record);
    return { ok: true, reply: { fabric: 'in-process', record } };
  };

  return { default: { deliver }, inbox };
}
