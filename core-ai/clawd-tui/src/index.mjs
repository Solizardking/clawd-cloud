export const theme = {
  purple: '#9945FF',
  green: '#14F195',
  bg: '#0d1117',
  panel: '#142033',
};

export const defaultWaitingPhrases = [
  'flibbertigibbeting',
  'kerfuffling',
  'dillydallying',
  'twiddling thumbs',
  'noodling',
  'bamboozling',
  'moseying',
  'hobnobbing',
  'pondering',
  'conjuring',
];

export function pickWaitingPhrase(tick, phrases = defaultWaitingPhrases) {
  const idx = Math.floor(tick / 10) % phrases.length;
  return phrases[idx] ?? phrases[0] ?? 'waiting';
}

const SENSITIVE = [
  'HELIUS_API_KEY',
  'XAI_API_KEY',
  'OPENROUTER_API_KEY',
  'ANTHROPIC_API_KEY',
  'PRIVY_APP_SECRET',
  'SOLANA_RPC_URL',
];

export function doctor(env = process.env) {
  return {
    node: process.version,
    nodeOk: Number(process.versions.node.split('.')[0]) >= 20,
    env: Object.fromEntries(SENSITIVE.map((name) => [name, Boolean(env[name])])),
  };
}
