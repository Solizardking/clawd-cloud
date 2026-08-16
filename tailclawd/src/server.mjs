#!/usr/bin/env node
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORE_ROOT = join(ROOT, '..');
const HOST = process.env.TAILCLAWD_HOST || '127.0.0.1';
const PORT = Number(process.env.TAILCLAWD_PORT || 4402);
const TOKEN = process.env.TAILCLAWD_TOKEN || '';

const sessions = [];
const startedAt = Date.now();

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'no-referrer',
  });
  res.end(payload);
}

function html(res, body) {
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'",
  });
  res.end(body);
}

function loadCatalog() {
  const path = join(CORE_ROOT, 'MANIFEST.json');
  if (!existsSync(path)) return { name: 'clawd-cloud', required: [], additional: [] };
  return JSON.parse(readFileSync(path, 'utf8'));
}

function authorized(req) {
  if (!TOKEN) return req.method === 'GET' || req.method === 'HEAD';
  const header = req.headers.authorization || '';
  return header === `Bearer ${TOKEN}`;
}

function consolePage() {
  const catalog = loadCatalog();
  const required = catalog.required ?? [];
  const rows = required
    .map(
      (p) =>
        `<tr><td><code>${p.path}</code></td><td>${p.layer}</td><td>${p.summary}</td></tr>`,
    )
    .join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TailClawd</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #0d1117; color: #c9d1d9; }
    header { padding: 24px 32px; border-bottom: 1px solid #30363d; background: #142033; }
    h1 { margin: 0 0 8px; color: #14F195; font-size: 22px; }
    p { margin: 0; color: #8b949e; }
    main { padding: 24px 32px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #21262d; vertical-align: top; }
    th { color: #9945FF; font-weight: 600; }
    code { color: #14F195; }
    .meta { margin-bottom: 24px; }
  </style>
</head>
<body>
  <header>
    <h1>TailClawd</h1>
    <p>Clawd Cloud operator console · catalog from MANIFEST.json · bind ${HOST}:${PORT}</p>
  </header>
  <main>
    <div class="meta">uptime ${Math.round((Date.now() - startedAt) / 1000)}s · sessions ${sessions.length} · packages ${required.length}</div>
    <table>
      <thead><tr><th>Path</th><th>Layer</th><th>Summary</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </main>
</body>
</html>`;
}

export function createTailclawdServer() {
  return createServer((req, res) => {
    const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);
    if (!authorized(req) && req.method !== 'GET') {
      json(res, 401, { error: 'unauthorized' });
      return;
    }
    if (url.pathname === '/health') {
      json(res, 200, { ok: true, service: 'tailclawd', uptimeMs: Date.now() - startedAt });
      return;
    }
    if (url.pathname === '/v1/catalog') {
      json(res, 200, loadCatalog());
      return;
    }
    if (url.pathname === '/v1/sessions' && req.method === 'GET') {
      json(res, 200, { sessions });
      return;
    }
    if (url.pathname === '/' || url.pathname === '/index.html') {
      html(res, consolePage());
      return;
    }
    json(res, 404, { error: 'not_found' });
  });
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const server = createTailclawdServer();
  server.listen(PORT, HOST, () => {
    console.log(`tailclawd listening on http://${HOST}:${PORT}`);
  });
}
