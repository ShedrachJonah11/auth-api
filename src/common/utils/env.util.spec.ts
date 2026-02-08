import { isProduction, isDevelopment, isTest } from './env.util';

describe('env.util', () => {
  const ORIG = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = ORIG;
  });

  it('isProduction', () => {
    process.env.NODE_ENV = 'production';
    expect(isProduction()).toBe(true);
  });

  it('isDevelopment defaults to true when unset', () => {
    delete process.env.NODE_ENV;
    expect(isDevelopment()).toBe(true);
  });

  it('isTest matches test', () => {
    process.env.NODE_ENV = 'test';
    expect(isTest()).toBe(true);
    expect(isProduction()).toBe(false);
  });
});
