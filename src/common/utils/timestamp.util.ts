export function unixSeconds(date: Date = new Date()): number {
  return Math.floor(date.getTime() / 1000);
}

export function fromUnixSeconds(seconds: number): Date {
  return new Date(seconds * 1000);
}

export function elapsedMs(since: number): number {
  return Date.now() - since;
}
