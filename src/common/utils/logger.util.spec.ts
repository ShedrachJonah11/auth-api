import { getLogger } from './logger.util';

describe('getLogger', () => {
  it('returns a logger for a context', () => {
    const l = getLogger('TestContext');
    expect(l).toBeDefined();
    expect(typeof l.log).toBe('function');
  });

  it('caches loggers by context', () => {
    const a = getLogger('Same');
    const b = getLogger('Same');
    expect(a).toBe(b);
  });

  it('different contexts yield different loggers', () => {
    expect(getLogger('A')).not.toBe(getLogger('B'));
  });
});
