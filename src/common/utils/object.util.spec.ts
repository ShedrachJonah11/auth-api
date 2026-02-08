import { pickFields, omitFields, isPlainObject } from './object.util';

describe('object.util', () => {
  const obj = { a: 1, b: 2, c: 3 } as const;

  it('pickFields keeps only listed keys', () => {
    expect(pickFields(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('omitFields removes listed keys', () => {
    expect(omitFields(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('isPlainObject detects literal objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject([1])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
  });
});
