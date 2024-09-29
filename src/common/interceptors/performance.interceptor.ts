import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PerformanceInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const correlationId = request.correlationId || 'unknown';
        
        if (duration > 1000) { // Log slow requests (> 1 second)
          this.logger.warn(
            `Slow request detected: ${method} ${url} - ${duration}ms - Correlation ID: ${correlationId}`,
          );
        } else if (duration > 500) { // Log moderately slow requests (> 500ms)
          this.logger.log(
            `Moderate request time: ${method} ${url} - ${duration}ms - Correlation ID: ${correlationId}`,
          );
        }

        // Log all requests in development
        if (process.env.NODE_ENV === 'development') {
          this.logger.debug(
            `Request completed: ${method} ${url} - ${duration}ms - Correlation ID: ${correlationId}`,
          );
        }
      }),
    );
  }
}
