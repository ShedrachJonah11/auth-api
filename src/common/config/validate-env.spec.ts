import { validateEnv } from './validate-env';

describe('validateEnv', () => {
  const ORIG = { ...process.env };
  afterEach(() => {
    process.env = { ...ORIG };
  });

  it('is a no-op in non-production', () => {
    process.env.NODE_ENV = 'development';
    expect(() => validateEnv()).not.toThrow();
  });

  it('throws when required vars are missing in production', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.JWT_SECRET;
    delete process.env.MONGODB_URI;
    expect(() => validateEnv()).toThrow(/Missing required env vars/);
  });

  it('passes when required vars are present', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 'x'.repeat(40);
    process.env.MONGODB_URI = 'mongodb://localhost:27017/x';
    expect(() => validateEnv()).not.toThrow();
  });
});
