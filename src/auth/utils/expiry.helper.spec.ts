import { parseDurationMs } from './expiry.helper';

describe('parseDurationMs', () => {
  it('parses seconds/minutes/hours/days', () => {
    expect(parseDurationMs('30s')).toBe(30_000);
    expect(parseDurationMs('5m')).toBe(300_000);
    expect(parseDurationMs('2h')).toBe(7_200_000);
    expect(parseDurationMs('7d')).toBe(604_800_000);
  });

  it('falls back on invalid input', () => {
    expect(parseDurationMs('bogus', 42)).toBe(42);
    expect(parseDurationMs('5x', 0)).toBe(0);
  });
});
