import { Logger } from '@nestjs/common';

const log = new Logger('Bootstrap');

export function logStartupBanner(port: number | string): void {
  const env = process.env.NODE_ENV || 'development';
  const version = process.env.npm_package_version || '0.0.0';
  log.log(`auth-api v${version} starting in ${env} mode`);
  log.log(`listening on http://localhost:${port}`);
  if (process.env.SWAGGER_ENABLED !== 'false') {
    log.log(`swagger ui:    http://localhost:${port}/api`);
  }
  log.log(`health:        http://localhost:${port}/api/health`);
}
