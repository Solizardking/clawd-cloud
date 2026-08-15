#!/usr/bin/env node
import { listPackages, loadManifest, packagesByLayer } from './catalog.mjs';

const command = process.argv[2] ?? 'catalog';

if (command === 'help' || command === '--help' || command === '-h') {
  console.log(`clawd-core <catalog|layers|json>

  catalog   Print the Core AI package map
  layers    Group packages by architecture layer
  json      Dump MANIFEST.json
`);
  process.exit(0);
}

if (command === 'json') {
  console.log(JSON.stringify(loadManifest(), null, 2));
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

const pkgs = listPackages();
console.log('Clawd Core AI catalog\n');
for (const pkg of pkgs) {
  console.log(`${pkg.path.padEnd(22)} ${pkg.layer.padEnd(10)} ${pkg.summary}`);
}
