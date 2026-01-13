import { envInt } from '../../common/config/env';

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireDigit: boolean;
  requireSymbol: boolean;
}

export function getPasswordPolicy(): PasswordPolicy {
  return {
    minLength: envInt('PASSWORD_MIN_LENGTH', 8),
    requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false',
    requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== 'false',
    requireDigit: process.env.PASSWORD_REQUIRE_DIGIT !== 'false',
    requireSymbol: process.env.PASSWORD_REQUIRE_SYMBOL === 'true',
  };
}

export function evaluatePolicy(password: string, policy: PasswordPolicy = getPasswordPolicy()): string[] {
  const errors: string[] = [];
  if (password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters`);
  }
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  }
  if (policy.requireDigit && !/\d/.test(password)) {
    errors.push('Password must contain a digit');
  }
  if (policy.requireSymbol && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain a symbol');
  }
  return errors;
}

export function policyToString(policy = getPasswordPolicy()): string {
  const parts: string[] = [`min ${policy.minLength}`];
  if (policy.requireUppercase) parts.push('uppercase');
  if (policy.requireLowercase) parts.push('lowercase');
  if (policy.requireDigit) parts.push('digit');
  if (policy.requireSymbol) parts.push('symbol');
  return parts.join(', ');
}
