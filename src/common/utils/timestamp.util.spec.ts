import { unixSeconds, fromUnixSeconds, elapsedMs } from './timestamp.util';

describe('timestamp.util', () => {
  it('round-trips unix seconds', () => {
    const date = new Date('2026-01-01T00:00:00Z');
    expect(fromUnixSeconds(unixSeconds(date)).toISOString()).toBe(date.toISOString());
  });

  it('elapsedMs is non-negative', () => {
    expect(elapsedMs(Date.now() - 10)).toBeGreaterThanOrEqual(10);
    expect(elapsedMs(Date.now() + 1000)).toBeLessThanOrEqual(0);
  });
});
