import { envString, envInt, envBool, envList } from './env';

describe('env helpers', () => {
  const ORIG = { ...process.env };
  afterEach(() => {
    process.env = { ...ORIG };
  });

  it('envString returns fallback when unset', () => {
    delete process.env.FOO;
    expect(envString('FOO', 'bar')).toBe('bar');
  });

  it('envString returns value when set', () => {
    process.env.FOO = 'baz';
    expect(envString('FOO', 'bar')).toBe('baz');
  });

  it('envInt parses ints, falls back on invalid', () => {
    process.env.NUM = '42';
    expect(envInt('NUM', 7)).toBe(42);
    process.env.NUM = 'abc';
    expect(envInt('NUM', 7)).toBe(7);
  });

  it('envBool recognizes truthy and falsy strings', () => {
    process.env.FLAG = 'true';
    expect(envBool('FLAG')).toBe(true);
    process.env.FLAG = '1';
    expect(envBool('FLAG')).toBe(true);
    process.env.FLAG = 'no';
    expect(envBool('FLAG', true)).toBe(false);
  });

  it('envList splits CSV and trims', () => {
    process.env.LIST = 'a, b ,c';
    expect(envList('LIST')).toEqual(['a', 'b', 'c']);
    delete process.env.LIST;
    expect(envList('LIST', ['x'])).toEqual(['x']);
  });
});
