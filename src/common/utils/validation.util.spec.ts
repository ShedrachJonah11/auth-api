import { ValidationUtil } from './validation.util';

describe('ValidationUtil', () => {
  it('isValidEmail returns true for valid emails', () => {
    expect(ValidationUtil.isValidEmail('a@b.co')).toBe(true);
    expect(ValidationUtil.isValidEmail('user.name+tag@example.com')).toBe(true);
  });

  it('isValidEmail returns false for invalid emails', () => {
    expect(ValidationUtil.isValidEmail('not-an-email')).toBe(false);
    expect(ValidationUtil.isValidEmail('missing@dot')).toBe(false);
    expect(ValidationUtil.isValidEmail('')).toBe(false);
  });

  it('sanitizeInput trims and escapes HTML', () => {
    const out = ValidationUtil.sanitizeInput('  <script>x</script>  ');
    expect(out.startsWith(' ')).toBe(false);
    expect(out).not.toContain('<');
  });

  it('isValidPassword enforces complexity', () => {
    expect(ValidationUtil.isValidPassword('Short1')).toBe(false);
    expect(ValidationUtil.isValidPassword('LongerPass1')).toBe(true);
    expect(ValidationUtil.isValidPassword('nouppercase1')).toBe(false);
  });
});
