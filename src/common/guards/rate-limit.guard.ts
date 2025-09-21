import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection.remoteAddress;
    const key = `rate_limit:${ip}`;
    
    const limit = this.reflector.get<number>('rateLimit', context.getHandler()) || 100;
    const windowMs = this.reflector.get<number>('rateLimitWindow', context.getHandler()) || 60000; // 1 minute
    
    const current = await this.cacheManager.get<number>(key) || 0;
    
    if (current >= limit) {
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    
    await this.cacheManager.set(key, current + 1, windowMs);
    return true;
  }
}
