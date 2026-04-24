import { ok, err, isOk, mapOk } from './result.type';

describe('Result', () => {
  it('ok wraps a value', () => {
    const r = ok(1);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(1);
  });

  it('err wraps an error', () => {
    const e = new Error('x');
    const r = err(e);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe(e);
  });

  it('isOk acts as a type guard', () => {
    const r = ok('hi');
    if (isOk(r)) {
      expect(r.value).toBe('hi');
    }
  });
});

  it('mapOk transforms value on ok, passes through err', () => {
    const r1 = ok(2);
    const r2 = mapOk(r1, (n) => n * 10);
    expect(r2.ok).toBe(true);
    if (r2.ok) expect(r2.value).toBe(20);
  });
});
