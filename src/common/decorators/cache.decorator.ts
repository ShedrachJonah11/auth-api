import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '../interceptors/cache.interceptor';

export function CacheResponse(ttl?: number) {
  return applyDecorators(
    UseInterceptors(CacheInterceptor),
  );
}
