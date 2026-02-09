import { redactSecrets } from './redact.util';

describe('redactSecrets', () => {
  it('masks top-level secret fields', () => {
    expect(redactSecrets({ password: 'p', email: 'e@x' })).toEqual({
      password: '[REDACTED]',
      email: 'e@x',
    });
  });

  it('recurses into nested objects', () => {
    const out = redactSecrets({ user: { token: 't', name: 'n' } });
    expect((out as any).user.token).toBe('[REDACTED]');
    expect((out as any).user.name).toBe('n');
  });

  it('handles arrays', () => {
    const out = redactSecrets([{ password: 'p' }]);
    expect((out as any)[0].password).toBe('[REDACTED]');
  });

  it('is case-insensitive', () => {
    expect((redactSecrets({ Authorization: 'x' }) as any).Authorization).toBe('[REDACTED]');
  });
});
