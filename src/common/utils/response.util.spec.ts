import { ResponseUtil } from './response.util';

describe('ResponseUtil', () => {
  it('success wraps data', () => {
    const r = ResponseUtil.success({ id: 1 });
    expect(r.success).toBe(true);
    expect(r.data).toEqual({ id: 1 });
    expect(r.statusCode).toBe(200);
  });

  it('error encodes error code', () => {
    const r = ResponseUtil.error('nope', 400, 'CUSTOM');
    expect(r.success).toBe(false);
    expect(r.errorCode).toBe('CUSTOM');
  });

  it('paginated computes pages', () => {
    const r = ResponseUtil.paginated([1, 2], 10, 1, 2);
    expect(r.pagination.totalPages).toBe(5);
    expect(r.pagination.hasNext).toBe(true);
  });
});
