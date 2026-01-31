import { toSafeUser } from './safe-user.util';

describe('toSafeUser', () => {
  it('strips sensitive fields', () => {
    const user: any = {
      email: 'a@b.co',
      name: 'Test',
      password: 'hashed',
      twoFactorSecret: 'shhh',
      resetPasswordToken: 't',
      emailVerificationToken: 'v',
      backupCodes: ['x'],
      passwordHistory: ['y'],
      role: 'user',
    };
    const safe = toSafeUser(user);
    expect(safe).not.toHaveProperty('password');
    expect(safe).not.toHaveProperty('twoFactorSecret');
    expect(safe).not.toHaveProperty('resetPasswordToken');
    expect(safe).not.toHaveProperty('emailVerificationToken');
    expect(safe).not.toHaveProperty('backupCodes');
    expect(safe).not.toHaveProperty('passwordHistory');
    expect(safe.email).toBe('a@b.co');
    expect(safe.role).toBe('user');
  });

  it('works for Mongoose-like docs with toObject', () => {
    const doc: any = {
      toObject() {
        return { email: 'a@b.co', password: 'x', role: 'admin' };
      },
    };
    const safe = toSafeUser(doc);
    expect(safe).not.toHaveProperty('password');
    expect(safe.email).toBe('a@b.co');
  });
});
