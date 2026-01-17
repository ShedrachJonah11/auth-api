import { buildPaginationMeta } from './paginated-response.interface';

describe('buildPaginationMeta', () => {
  it('computes pages and flags', () => {
    const m = buildPaginationMeta(95, 2, 20);
    expect(m.totalPages).toBe(5);
    expect(m.hasNext).toBe(true);
    expect(m.hasPrev).toBe(true);
  });

  it('hasNext is false on last page', () => {
    const m = buildPaginationMeta(20, 1, 20);
    expect(m.hasNext).toBe(false);
    expect(m.hasPrev).toBe(false);
  });

  it('handles zero limit safely', () => {
    const m = buildPaginationMeta(10, 1, 0);
    expect(m.totalPages).toBe(0);
  });
});
