import { ApiVersionMiddleware } from './api-version.middleware';

describe('ApiVersionMiddleware', () => {
  it('sets X-API-Version header', () => {
    const mw = new ApiVersionMiddleware();
    const headers: Record<string, string> = {};
    const res: any = { setHeader: (k: string, v: string) => (headers[k] = v) };
    const next = jest.fn();
    mw.use({} as any, res, next as any);
    expect(headers['X-API-Version']).toBeDefined();
    expect(next).toHaveBeenCalled();
  });
});
