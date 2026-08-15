export {
  loadManifest,
  listPackages,
  packagesByLayer,
  requiredPaths,
} from './catalog.mjs';

export {
  loadCloudRegistry,
  resolveIdentity,
  listCapabilities,
  formatCloudStatus,
} from './registry.mjs';

export { routeMessage, ROUTE_STATUSES } from './router.mjs';

export {
  createDefaultAdapters,
  createInProcessAdapters,
  detectBlocker,
} from './adapters.mjs';

export {
  COMMUNICATION_TARGETS,
  CAPABILITIES,
  ALIASES,
} from './cloud-map.mjs';

export const identity = {
  name: 'Clawd Cloud',
  token: 'CLAWD',
  mint: '8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump',
  thesis:
    'Clawd Cloud is the complete harness for Solana and blockchain-native financial agents. Clawd is the identity. Helius is the pipe.',
};
