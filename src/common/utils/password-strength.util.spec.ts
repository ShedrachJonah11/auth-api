import { PasswordStrengthUtil } from './password-strength.util';

describe('PasswordStrengthUtil', () => {
  it('flags short passwords', () => {
    const r = PasswordStrengthUtil.validate('abc');
    expect(r.isStrong).toBe(false);
    expect(r.feedback).toContain('Password should be at least 8 characters long');
  });

  it('rewards length, mixed case, and digits', () => {
    const r = PasswordStrengthUtil.validate('Abcdef12');
    expect(r.score).toBeGreaterThanOrEqual(3);
    expect(r.isStrong).toBe(true);
  });

  it('caps score at 4', () => {
    const r = PasswordStrengthUtil.validate('Abcdef12!@VeryLongAndStrong');
    expect(r.score).toBeLessThanOrEqual(4);
  });

  it('isStrongEnough reflects validate result', () => {
    expect(PasswordStrengthUtil.isStrongEnough('abc')).toBe(false);
    expect(PasswordStrengthUtil.isStrongEnough('Abcdef12!')).toBe(true);
  });
});
