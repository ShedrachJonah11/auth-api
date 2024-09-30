import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomRateLimitGuard extends ThrottlerGuard {
  protected async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const { req, res } = this.getRequestResponse(context);
    const key = this.generateKey(context, req);
    const totalHits = await this.storageService.increment(key, ttl);

    if (totalHits > limit) {
      const correlationId = req.correlationId || 'unknown';
      throw new HttpException(
        {
          message: 'Rate limit exceeded',
          errorCode: 'RATE_LIMIT_EXCEEDED',
          retryAfter: Math.round(ttl / 1000),
          correlationId,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - totalHits));
    res.setHeader('X-RateLimit-Reset', new Date(Date.now() + ttl).toISOString());

    return true;
  }
}
