import * as utils from './index';

describe('auth/utils barrel', () => {
  it('exposes bcrypt helpers', () => {
    expect(typeof utils.hashPassword).toBe('function');
    expect(typeof utils.comparePassword).toBe('function');
  });

  it('exposes lockout helpers', () => {
    expect(typeof utils.isLocked).toBe('function');
    expect(typeof utils.nextLockUntil).toBe('function');
  });

  it('exposes token + email helpers', () => {
    expect(typeof utils.generateOpaqueToken).toBe('function');
    expect(typeof utils.normalizeEmail).toBe('function');
    expect(typeof utils.parseDurationMs).toBe('function');
  });
});
