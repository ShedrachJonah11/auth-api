import { truncate, slugify, capitalize, maskEmail } from './string.util';

describe('string.util', () => {
  it('truncate keeps short strings', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('truncate adds suffix when long', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('slugify normalizes a title', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('  --Multi   Space--  ')).toBe('-multi-space-');
  });

  it('capitalize handles empty and normal', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize('abc')).toBe('Abc');
  });

  it('maskEmail hides middle of local part', () => {
    expect(maskEmail('alice@example.com')).toBe('a***e@example.com');
    expect(maskEmail('ab@x.y')).toBe('a*@x.y');
  });
});
