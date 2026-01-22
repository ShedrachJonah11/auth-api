import { normalizeEmail } from './normalize-email';

describe('normalizeEmail', () => {
  it('lowercases', () => {
    expect(normalizeEmail('AbC@Example.COM')).toBe('abc@example.com');
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeEmail('  abc@example.com  ')).toBe('abc@example.com');
  });

  it('handles null/undefined', () => {
    expect(normalizeEmail(null)).toBe('');
    expect(normalizeEmail(undefined)).toBe('');
  });
});
