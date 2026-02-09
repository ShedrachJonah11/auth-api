import { shouldThrottle, RateLimitBucket } from './rate-limit.util';

describe('shouldThrottle', () => {
  it('allows up to the limit, then throttles', () => {
    const b: RateLimitBucket = { count: 0, windowStart: Date.now() };
    expect(shouldThrottle(b, 3, 1000)).toBe(false);
    expect(shouldThrottle(b, 3, 1000)).toBe(false);
    expect(shouldThrottle(b, 3, 1000)).toBe(false);
    expect(shouldThrottle(b, 3, 1000)).toBe(true);
  });

  it('resets after window passes', () => {
    const b: RateLimitBucket = { count: 5, windowStart: Date.now() - 2000 };
    expect(shouldThrottle(b, 3, 1000)).toBe(false);
  });
});
