import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';
import { ERROR_CODES } from '../constants/error-codes.constants';

export class InvalidCredentialsException extends BusinessException {
  constructor() {
    super('Invalid credentials', HttpStatus.UNAUTHORIZED, ERROR_CODES.INVALID_CREDENTIALS);
  }
}

export class TokenExpiredException extends BusinessException {
  constructor() {
    super('Token expired', HttpStatus.UNAUTHORIZED, ERROR_CODES.TOKEN_EXPIRED);
  }
}

export class TokenRevokedException extends BusinessException {
  constructor() {
    super('Token has been revoked', HttpStatus.UNAUTHORIZED, ERROR_CODES.TOKEN_REVOKED);
  }
}

export class RegistrationDisabledException extends BusinessException {
  constructor() {
    super('Registration is currently disabled', HttpStatus.CONFLICT, ERROR_CODES.REGISTRATION_DISABLED);
  }
}

export class EmailTakenException extends BusinessException {
  constructor() {
    super('User with this email already exists', HttpStatus.CONFLICT, ERROR_CODES.EMAIL_TAKEN);
  }
}

export class AccountLockedException extends BusinessException {
  constructor() {
    super('Account is temporarily locked due to too many failed attempts', HttpStatus.LOCKED, ERROR_CODES.ACCOUNT_LOCKED);
  }
}
