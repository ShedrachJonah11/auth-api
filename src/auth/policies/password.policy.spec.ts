import { evaluatePolicy, policyToString } from './password.policy';

describe('password.policy', () => {
  it('returns no errors for a strong password', () => {
    expect(evaluatePolicy('Strong1Pass')).toEqual([]);
  });

  it('flags too-short passwords', () => {
    const errs = evaluatePolicy('a1A');
    expect(errs.some((e) => e.includes('at least'))).toBe(true);
  });

  it('flags missing uppercase', () => {
    const errs = evaluatePolicy('alllower1');
    expect(errs.some((e) => e.includes('uppercase'))).toBe(true);
  });

  it('flags missing digit', () => {
    const errs = evaluatePolicy('NoDigitsHere');
    expect(errs.some((e) => e.includes('digit'))).toBe(true);
  });

  it('policyToString lists active rules', () => {
    const out = policyToString({
      minLength: 12,
      requireUppercase: true,
      requireLowercase: false,
      requireDigit: true,
      requireSymbol: true,
    });
    expect(out).toContain('min 12');
    expect(out).toContain('uppercase');
    expect(out).toContain('digit');
    expect(out).not.toContain('lowercase');
  });
});
