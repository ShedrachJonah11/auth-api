import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = this.generateCacheKey(request);

    // Check if data exists in cache
    const cachedData = await this.cacheManager.get(key);
    if (cachedData) {
      return of(cachedData);
    }

    // If not in cache, execute the handler and cache the result
    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheManager.set(key, data, 300000); // 5 minutes TTL
      }),
    );
  }

  private generateCacheKey(request: any): string {
    const { method, url, query, body } = request;
    return `${method}:${url}:${JSON.stringify(query)}:${JSON.stringify(body)}`;
  }
}
