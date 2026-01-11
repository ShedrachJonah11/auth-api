import * as bcrypt from 'bcryptjs';
import { envInt } from '../../common/config/env';
import { DEFAULT_BCRYPT_ROUNDS, MIN_BCRYPT_ROUNDS, MAX_BCRYPT_ROUNDS } from '../../common/constants';

export function getBcryptRounds(): number {
  const raw = envInt('BCRYPT_ROUNDS', DEFAULT_BCRYPT_ROUNDS);
  return Math.min(MAX_BCRYPT_ROUNDS, Math.max(MIN_BCRYPT_ROUNDS, raw));
}

/** Hash a plaintext password using bcrypt at the configured rounds. */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, getBcryptRounds());
}

/** Constant-time compare of a plaintext password against a bcrypt hash. */
export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
