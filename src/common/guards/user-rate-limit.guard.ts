import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

@Injectable()
export class UserRateLimitGuard implements CanActivate {
  private store: RateLimitStore = {};

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return true; // Let auth guards handle unauthenticated requests
    }

    const userId = user.sub || user._id;
    const limit = this.reflector.get<number>('rateLimit', context.getHandler()) || 100;
    const windowMs = this.reflector.get<number>('rateLimitWindow', context.getHandler()) || 60000;

    const key = `user:${userId}`;
    const now = Date.now();
    const record = this.store[key];

    if (!record || now > record.resetTime) {
      this.store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return true;
    }

    if (record.count >= limit) {
      throw new HttpException(
        {
          message: 'Rate limit exceeded',
          errorCode: 'RATE_LIMIT_EXCEEDED',
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    return true;
  }
}

