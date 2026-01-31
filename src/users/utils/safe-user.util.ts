import { User, UserDocument } from '../user.schema';

const SENSITIVE_FIELDS = [
  'password',
  'twoFactorSecret',
  'resetPasswordToken',
  'emailVerificationToken',
  'backupCodes',
  'passwordHistory',
] as const;

export function toSafeUser(user: User | UserDocument): Partial<User> {
  const plain = (user as UserDocument).toObject ? (user as UserDocument).toObject() : { ...(user as User) };
  for (const f of SENSITIVE_FIELDS) {
    delete (plain as any)[f];
  }
  return plain;
}
