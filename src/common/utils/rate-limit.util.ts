export interface RateLimitBucket {
  count: number;
  windowStart: number;
}

export function shouldThrottle(bucket: RateLimitBucket, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (now - bucket.windowStart > windowMs) {
    bucket.windowStart = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  return bucket.count > limit;
}
