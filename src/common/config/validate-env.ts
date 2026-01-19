import { Logger } from '@nestjs/common';

const logger = new Logger('EnvValidator');

const PROD_REQUIRED = ['JWT_SECRET', 'MONGODB_URI'];

export function validateEnv(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const missing = PROD_REQUIRED.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    logger.error(`Missing required production env vars: ${missing.join(', ')}`);
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }

  if ((process.env.JWT_SECRET || '').length < 32) {
    logger.warn('JWT_SECRET should be at least 32 characters in production');
  }
}
