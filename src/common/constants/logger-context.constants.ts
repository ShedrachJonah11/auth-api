export const LOG_CONTEXT = {
  BOOTSTRAP: 'Bootstrap',
  HTTP: 'HTTP',
  AUTH: 'AuthService',
  USERS: 'UsersService',
  HEALTH: 'HealthService',
  CONFIG: 'ConfigService',
  CACHE: 'CacheService',
  METRICS: 'MetricsService',
  WEBHOOKS: 'WebhooksService',
} as const;

export type LogContextName = (typeof LOG_CONTEXT)[keyof typeof LOG_CONTEXT];
