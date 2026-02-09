export interface RetryOptions {
  attempts?: number;
  delayMs?: number;
  backoff?: 'linear' | 'exponential';
  shouldRetry?: (err: unknown) => boolean;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const attempts = options.attempts ?? 3;
  const baseDelay = options.delayMs ?? 100;
  const backoff = options.backoff ?? 'exponential';
  const shouldRetry = options.shouldRetry ?? (() => true);

  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === attempts - 1 || !shouldRetry(err)) {
        throw err;
      }
      const delay = backoff === 'exponential' ? baseDelay * Math.pow(2, i) : baseDelay * (i + 1);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}
