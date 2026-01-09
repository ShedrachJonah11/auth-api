import { ERROR_CODES } from './error-codes.constants';

describe('ERROR_CODES', () => {
  it('contains expected auth codes', () => {
    expect(ERROR_CODES.INVALID_CREDENTIALS).toBe('AUTH_INVALID_CREDENTIALS');
    expect(ERROR_CODES.TOKEN_EXPIRED).toBe('AUTH_TOKEN_EXPIRED');
    expect(ERROR_CODES.ACCOUNT_LOCKED).toBe('AUTH_ACCOUNT_LOCKED');
  });

  it('values are unique', () => {
    const values = Object.values(ERROR_CODES);
    expect(new Set(values).size).toBe(values.length);
  });
});
