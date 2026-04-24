export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function isOk<T, E>(r: Result<T, E>): r is { ok: true; value: T } {
  return r.ok;
}

export function mapOk<T, U, E>(r: { ok: true; value: T } | { ok: false; error: E }, fn: (v: T) => U): { ok: true; value: U } | { ok: false; error: E } {
  return r.ok ? { ok: true, value: fn(r.value) } : r;
}
