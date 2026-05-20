import type { AuthEvent } from './auth.events';

describe('AuthEvent', () => {
  it('accepts a UserRegisteredEvent literal', () => {
    const e: AuthEvent = {
      type: 'user.registered',
      userId: '1',
      email: 'a@b.co',
      at: new Date().toISOString(),
    };
    expect(e.type).toBe('user.registered');
  });

  it('accepts an AccountLockedEvent literal', () => {
    const e: AuthEvent = {
      type: 'auth.account_locked',
      userId: '1',
      email: 'a@b.co',
      lockUntil: new Date().toISOString(),
    };
    expect(e.type).toBe('auth.account_locked');
  });
});
