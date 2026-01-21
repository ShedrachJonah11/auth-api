import { getLockoutConfig, isLocked, nextLockUntil } from './lockout.helper';

describe('lockout.helper', () => {
  afterEach(() => {
    delete process.env.LOGIN_MAX_ATTEMPTS;
    delete process.env.LOGIN_LOCK_MINUTES;
  });

  it('uses defaults when no env set', () => {
    const c = getLockoutConfig();
    expect(c.maxAttempts).toBe(5);
    expect(c.lockMinutes).toBe(15);
  });

  it('respects env overrides', () => {
    process.env.LOGIN_MAX_ATTEMPTS = '3';
    process.env.LOGIN_LOCK_MINUTES = '30';
    const c = getLockoutConfig();
    expect(c.maxAttempts).toBe(3);
    expect(c.lockMinutes).toBe(30);
  });

  it('isLocked returns false for past or null', () => {
    expect(isLocked(undefined)).toBe(false);
    expect(isLocked(null)).toBe(false);
    expect(isLocked(new Date(Date.now() - 1000))).toBe(false);
  });

  it('isLocked returns true for future', () => {
    expect(isLocked(new Date(Date.now() + 60_000))).toBe(true);
  });

  it('nextLockUntil returns future date', () => {
    expect(nextLockUntil().getTime()).toBeGreaterThan(Date.now());
  });
});
