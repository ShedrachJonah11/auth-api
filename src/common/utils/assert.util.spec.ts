import { assertDefined, assertTrue } from './assert.util';

describe('assert.util', () => {
  it('assertDefined returns value when present', () => {
    expect(assertDefined('x', 'missing')).toBe('x');
    expect(assertDefined(0, 'missing')).toBe(0);
  });

  it('assertDefined throws on null/undefined', () => {
    expect(() => assertDefined(null, 'oh no')).toThrow('oh no');
    expect(() => assertDefined(undefined, 'oh no')).toThrow('oh no');
  });

  it('assertTrue acts as a type guard', () => {
    expect(() => assertTrue(false, 'nope')).toThrow('nope');
    expect(() => assertTrue(true, 'ok')).not.toThrow();
  });
});
