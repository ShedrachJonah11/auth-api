import { envInt } from '../../common/config/env';

export interface LockoutConfig {
  maxAttempts: number;
  lockMinutes: number;
}

export function getLockoutConfig(): LockoutConfig {
  return {
    maxAttempts: envInt('LOGIN_MAX_ATTEMPTS', 5),
    lockMinutes: envInt('LOGIN_LOCK_MINUTES', 15),
  };
}

export function isLocked(lockUntil: Date | undefined | null): boolean {
  return !!lockUntil && new Date(lockUntil).getTime() > Date.now();
}

export function nextLockUntil(): Date {
  const { lockMinutes } = getLockoutConfig();
  return new Date(Date.now() + lockMinutes * 60_000);
}
