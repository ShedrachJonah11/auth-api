import { isLocked, nextLockUntil } from './utils/lockout.helper';

describe('lockout round-trip', () => {
  it('isLocked + nextLockUntil', () => {
    process.env.LOGIN_LOCK_MINUTES = '1';
    const lockUntil = nextLockUntil();
    expect(isLocked(lockUntil)).toBe(true);
    expect(isLocked(new Date(Date.now() - 5000))).toBe(false);
    delete process.env.LOGIN_LOCK_MINUTES;
  });
});
