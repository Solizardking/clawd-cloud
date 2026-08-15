import { createDefaultAdapters } from './adapters.mjs';
import { loadCloudRegistry, resolveIdentity } from './registry.mjs';

const STATUSES = new Set(['delivered', 'unreachable', 'unsupported']);

function result(fields) {
  const status = STATUSES.has(fields.status) ? fields.status : 'unsupported';
  return {
    status,
    sender: fields.sender ?? null,
    destination: fields.destination ?? null,
    capability: fields.capability ?? null,
    capabilities: fields.capabilities ?? [],
    target: fields.target ?? null,
    reason: fields.reason ?? null,
    reply: fields.reply ?? null,
  };
}

/**
 * Route a message from a registered sender identity to a registered
 * destination (path, alias, or named capability).
 *
 * Adapters are the only I/O seam. Tests inject in-process adapters;
 * the operator uses createDefaultAdapters().
 */
export async function routeMessage(input = {}, options = {}) {
  const senderRaw = input.sender;
  const destRaw = input.destination;
  const message = input.message;

  const registry = options.registry ?? loadCloudRegistry(options.root);

  if (typeof message !== 'string' || message.length === 0) {
    return result({
      status: 'unsupported',
      sender: senderRaw ?? null,
      destination: destRaw ?? null,
      reason: 'message must be a non-empty string',
    });
  }

  const sender = resolveIdentity(registry, senderRaw);
  if (!sender) {
    return result({
      status: 'unsupported',
      sender: senderRaw ?? null,
      destination: destRaw ?? null,
      reason: `unknown sender identity: ${senderRaw}`,
    });
  }

  const destination = resolveIdentity(registry, destRaw);
  if (!destination) {
    return result({
      status: 'unsupported',
      sender: sender.identity,
      destination: destRaw ?? null,
      reason: `unknown destination identity: ${destRaw}`,
    });
  }

  const adapters = options.adapters ?? createDefaultAdapters({ root: registry.root });
  const kind = destination.target.kind;
  const adapter = adapters[kind] ?? adapters.default;
  if (!adapter || typeof adapter.deliver !== 'function') {
    return result({
      status: 'unreachable',
      sender: sender.identity,
      destination: destination.identity,
      capability: destination.resolvedCapability ?? null,
      capabilities: destination.capabilities,
      target: destination.target,
      reason: `no adapter registered for communication kind: ${kind}`,
    });
  }

  let delivery;
  try {
    delivery = await adapter.deliver({ sender, destination, message });
  } catch (err) {
    return result({
      status: 'unreachable',
      sender: sender.identity,
      destination: destination.identity,
      capability: destination.resolvedCapability ?? null,
      capabilities: destination.capabilities,
      target: destination.target,
      reason: err?.message ?? String(err),
    });
  }

  if (delivery?.ok) {
    return result({
      status: 'delivered',
      sender: sender.identity,
      destination: destination.identity,
      capability: destination.resolvedCapability ?? null,
      capabilities: destination.capabilities,
      target: destination.target,
      reply: delivery.reply ?? null,
    });
  }

  return result({
    status: 'unreachable',
    sender: sender.identity,
    destination: destination.identity,
    capability: destination.resolvedCapability ?? null,
    capabilities: destination.capabilities,
    target: destination.target,
    reason: delivery?.reason ?? 'adapter declined delivery',
  });
}

export { STATUSES as ROUTE_STATUSES };
