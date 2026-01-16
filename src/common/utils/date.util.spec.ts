import { addMinutes, addHours, addDays, isExpired, isoNow } from './date.util';

describe('date.util', () => {
  const base = new Date('2026-01-01T00:00:00Z');

  it('addMinutes adds correctly', () => {
    expect(addMinutes(base, 30).toISOString()).toBe('2026-01-01T00:30:00.000Z');
  });

  it('addHours adds correctly', () => {
    expect(addHours(base, 2).toISOString()).toBe('2026-01-01T02:00:00.000Z');
  });

  it('addDays adds correctly', () => {
    expect(addDays(base, 1).toISOString()).toBe('2026-01-02T00:00:00.000Z');
  });

  it('isExpired returns true for past and falsy dates', () => {
    expect(isExpired(new Date(Date.now() - 1000))).toBe(true);
    expect(isExpired(null)).toBe(true);
    expect(isExpired(undefined)).toBe(true);
  });

  it('isExpired returns false for future dates', () => {
    expect(isExpired(new Date(Date.now() + 60_000))).toBe(false);
  });

  it('isoNow returns ISO string', () => {
    expect(isoNow()).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
