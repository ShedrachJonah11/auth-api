import { of } from 'rxjs';
import { ResponseTimeInterceptor } from './response-time.interceptor';

describe('ResponseTimeInterceptor', () => {
  it('sets X-Response-Time after handler', (done) => {
    const interceptor = new ResponseTimeInterceptor();
    const headers: Record<string, string> = {};
    const ctx: any = {
      switchToHttp: () => ({
        getResponse: () => ({
          headersSent: false,
          setHeader: (k: string, v: string) => (headers[k] = v),
        }),
      }),
    };
    const next: any = { handle: () => of('ok') };
    interceptor.intercept(ctx, next).subscribe({
      complete: () => {
        expect(headers['X-Response-Time']).toMatch(/\d+ms/);
        done();
      },
    });
  });

  it('skips when headers already sent', (done) => {
    const interceptor = new ResponseTimeInterceptor();
    const setHeader = jest.fn();
    const ctx: any = {
      switchToHttp: () => ({
        getResponse: () => ({ headersSent: true, setHeader }),
      }),
    };
    const next: any = { handle: () => of('ok') };
    interceptor.intercept(ctx, next).subscribe({
      complete: () => {
        expect(setHeader).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
