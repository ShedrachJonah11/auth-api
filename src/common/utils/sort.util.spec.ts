import { buildSort } from './sort.util';

describe('buildSort', () => {
  it('falls back to createdAt desc by default', () => {
    expect(buildSort()).toEqual({ createdAt: -1 });
  });

  it('rejects unsafe field names', () => {
    expect(buildSort('$where')).toEqual({ createdAt: -1 });
    expect(buildSort('a.b')).toEqual({ createdAt: -1 });
  });

  it('applies asc/desc ordering', () => {
    expect(buildSort('name', 'asc')).toEqual({ name: 1 });
    expect(buildSort('name', 'desc')).toEqual({ name: -1 });
  });
});
