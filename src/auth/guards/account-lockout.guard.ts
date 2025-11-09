import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { LoginAttemptsService } from '../services/login-attempts.service';

@Injectable()
export class AccountLockoutGuard implements CanActivate {
  constructor(private readonly loginAttemptsService: LoginAttemptsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body?.email;

    if (!email) {
      return true; // Let validation handle missing email
    }

    const isLocked = await this.loginAttemptsService.isAccountLocked(email);
    if (isLocked) {
      throw new ForbiddenException({
        message: 'Account is temporarily locked due to too many failed login attempts',
        errorCode: 'ACCOUNT_LOCKED',
        retryAfter: '30 minutes',
      });
    }

    return true;
  }
}

