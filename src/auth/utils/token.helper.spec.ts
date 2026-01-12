import { generateOpaqueToken, generateNumericCode } from './token.helper';

describe('token helpers', () => {
  it('opaque token has correct length and is hex', () => {
    const t = generateOpaqueToken(16);
    expect(t).toHaveLength(32);
    expect(t).toMatch(/^[a-f0-9]+$/);
  });

  it('generates different tokens each call', () => {
    expect(generateOpaqueToken()).not.toBe(generateOpaqueToken());
  });

  it('numeric code is digits only and correct length', () => {
    const c = generateNumericCode(8);
    expect(c).toHaveLength(8);
    expect(c).toMatch(/^\d+$/);
  });
});
