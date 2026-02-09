const SECRET_KEYS = [
  'password',
  'token',
  'refreshToken',
  'authorization',
  'cookie',
  'secret',
  'apiKey',
  'twoFactorSecret',
  'backupCodes',
];

const SECRET_RX = new RegExp(`^(${SECRET_KEYS.join('|')})$`, 'i');

export function redactSecrets<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((v) => redactSecrets(v)) as unknown as T;
  }
  if (input && typeof input === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      out[k] = SECRET_RX.test(k) ? '[REDACTED]' : redactSecrets(v);
    }
    return out as T;
  }
  return input;
}
