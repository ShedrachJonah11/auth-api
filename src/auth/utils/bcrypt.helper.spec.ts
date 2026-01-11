import { hashPassword, comparePassword, getBcryptRounds } from './bcrypt.helper';

describe('bcrypt helper', () => {
  it('hashes and verifies a password', async () => {
    const hashed = await hashPassword('Secret123!');
    expect(hashed).not.toBe('Secret123!');
    await expect(comparePassword('Secret123!', hashed)).resolves.toBe(true);
    await expect(comparePassword('wrong', hashed)).resolves.toBe(false);
  });

  it('clamps bcrypt rounds within safe bounds', () => {
    process.env.BCRYPT_ROUNDS = '4';
    expect(getBcryptRounds()).toBeGreaterThanOrEqual(10);
    process.env.BCRYPT_ROUNDS = '20';
    expect(getBcryptRounds()).toBeLessThanOrEqual(12);
    delete process.env.BCRYPT_ROUNDS;
  });
});
