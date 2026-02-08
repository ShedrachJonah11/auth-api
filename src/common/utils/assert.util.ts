export function assertDefined<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
  return value;
}

export function assertTrue(cond: unknown, message: string): asserts cond {
  if (!cond) {
    throw new Error(message);
  }
}
