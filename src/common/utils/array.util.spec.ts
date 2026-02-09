import { unique, chunk, compact } from './array.util';

describe('array.util', () => {
  it('unique drops duplicates', () => {
    expect(unique([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it('chunk splits into batches', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('chunk with size 0 returns single batch', () => {
    expect(chunk([1, 2], 0)).toEqual([[1, 2]]);
  });

  it('compact filters falsy', () => {
    expect(compact([0, 1, '', 'a', null, 'b', undefined])).toEqual([1, 'a', 'b']);
  });
});
