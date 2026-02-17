export const STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  LOCKED: 423,
  TOO_MANY: 429,
  INTERNAL: 500,
  UNAVAILABLE: 503,
} as const;

export type StatusCode = (typeof STATUS)[keyof typeof STATUS];
