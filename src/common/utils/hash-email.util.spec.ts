import { hashEmail } from './hash-email.util';

describe('hashEmail', () => {
  it('produces deterministic hash', () => {
    expect(hashEmail('a@b.co')).toBe(hashEmail('a@b.co'));
  });

  it('is case-insensitive on input', () => {
    expect(hashEmail('A@B.co')).toBe(hashEmail('a@b.co'));
  });

  it('produces hex 64-char string', () => {
    expect(hashEmail('a@b.co')).toMatch(/^[a-f0-9]{64}$/);
  });

  it('different inputs give different hashes', () => {
    expect(hashEmail('a@b.co')).not.toBe(hashEmail('c@d.co'));
  });
});
