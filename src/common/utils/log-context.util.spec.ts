import { buildLogContext } from './log-context.util';

describe('buildLogContext', () => {
  it('extracts fields from request', () => {
    const req: any = {
      requestId: 'r1',
      correlationId: 'c1',
      user: { sub: 'u1' },
      ip: '127.0.0.1',
      method: 'GET',
      path: '/api/me',
    };
    expect(buildLogContext(req)).toEqual({
      requestId: 'r1',
      correlationId: 'c1',
      userId: 'u1',
      ip: '127.0.0.1',
      method: 'GET',
      path: '/api/me',
    });
  });

  it('handles missing user and ids', () => {
    const req: any = { method: 'POST', path: '/x', ip: '::1' };
    const ctx = buildLogContext(req);
    expect(ctx.userId).toBeUndefined();
    expect(ctx.method).toBe('POST');
  });
});
