import { isValidObjectId, toObjectId } from './mongo-id.util';

describe('mongo-id.util', () => {
  it('isValidObjectId returns true for hex 24-char string', () => {
    expect(isValidObjectId('507f1f77bcf86cd799439011')).toBe(true);
  });

  it('isValidObjectId returns false for invalid', () => {
    expect(isValidObjectId('not-an-id')).toBe(false);
    expect(isValidObjectId('123')).toBe(false);
  });

  it('toObjectId throws on bad id', () => {
    expect(() => toObjectId('bad')).toThrow();
  });

  it('toObjectId returns Mongo ObjectId on valid input', () => {
    const id = toObjectId('507f1f77bcf86cd799439011');
    expect(id.toString()).toBe('507f1f77bcf86cd799439011');
  });
});
