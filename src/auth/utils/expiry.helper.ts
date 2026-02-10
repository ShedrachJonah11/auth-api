const SUFFIX_MS: Record<string, number> = {
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
};

export function parseDurationMs(input: string, fallbackMs = 0): number {
  const match = /^(\d+)([smhd])$/.exec(input.trim());
  if (!match) return fallbackMs;
  const [, n, suffix] = match;
  return parseInt(n, 10) * SUFFIX_MS[suffix];
}
