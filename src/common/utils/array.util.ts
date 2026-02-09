export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items.slice()];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

export function compact<T>(items: Array<T | null | undefined | false | 0 | ''>): T[] {
  return items.filter((v): v is T => Boolean(v));
}
