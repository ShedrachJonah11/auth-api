export function pickFields<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) {
    if (k in obj) {
      out[k] = obj[k];
    }
  }
  return out;
}

export function omitFields<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const out = { ...obj } as T;
  for (const k of keys) {
    delete (out as Record<keyof T, unknown>)[k];
  }
  return out as Omit<T, K>;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
