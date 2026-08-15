#!/usr/bin/env node
import { loadManifest, packagesByLayer } from './catalog.mjs';
import { formatCloudStatus, loadCloudRegistry } from './registry.mjs';

const command = process.argv[2] ?? 'catalog';

if (command === 'help' || command === '--help' || command === '-h') {
  console.log(`clawd-core <catalog|cloud|layers|json>

  catalog   Print the Clawd Cloud map (path, layer, communication target)
  cloud     Print destinations, capabilities, and routes
  layers    Group packages by architecture layer
  json      Dump MANIFEST.json
`);
  process.exit(0);
}

if (command === 'json') {
  console.log(JSON.stringify(loadManifest(), null, 2));
  process.exit(0);
}

if (command === 'cloud' || command === 'status') {
  process.stdout.write(formatCloudStatus());
  process.exit(0);
}

if (command === 'layers') {
  const grouped = packagesByLayer();
  for (const [layer, pkgs] of Object.entries(grouped)) {
    console.log(`\n[${layer}]`);
    for (const pkg of pkgs) {
      console.log(`  ${pkg.path.padEnd(22)} ${pkg.summary}`);
    }
  }
  process.exit(0);
}

const registry = loadCloudRegistry();
console.log('Clawd Cloud catalog\n');
for (const dest of registry.destinations) {
  const route = dest.target.endpoint || dest.target.invoke;
  console.log(
    `${dest.path.padEnd(22)} ${dest.layer.padEnd(10)} ${dest.target.kind.padEnd(12)} ${route}`,
  );
}
