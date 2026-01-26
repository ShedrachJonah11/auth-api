import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { HEADER_RESPONSE_TIME } from '../constants/http.constants';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - start;
        if (!res.headersSent) {
          res.setHeader(HEADER_RESPONSE_TIME, `${elapsed}ms`);
        }
      }),
    );
  }
}
