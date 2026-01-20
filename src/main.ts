import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { AppModule } from './app.module';
import { validateEnv } from './common/config/validate-env';
import { HEADER_REQUEST_ID, HEADER_CORRELATION_ID } from './common/constants/http.constants';
import { logStartupBanner } from './common/utils/banner.util';
import { envInt, envBool } from './common/config/env';
import { DEFAULT_PORT, DEFAULT_REQUEST_TIMEOUT_MS } from './common/constants/app.constants';
import { isProduction } from './common/utils/env.util';

async function bootstrap() {
  validateEnv();
  const logLevel = envBool('DEBUG_MODE')
    ? ['error', 'warn', 'log', 'debug', 'verbose']
    : (process.env.LOG_LEVEL || 'log').split(',');
  const app = await NestFactory.create(AppModule, { logger: logLevel as any });
  const httpAdapter = app.getHttpAdapter().getInstance();
  if (httpAdapter && typeof httpAdapter.set === 'function') {
    // trust the first proxy hop so X-Forwarded-For and req.ip work behind a load balancer
    httpAdapter.set('trust proxy', 1);
  }
  const logger = new Logger('Bootstrap');

  const requestIdHeader = (process.env.REQUEST_ID_HEADER || 'x-request-id').toLowerCase();
  app.use((req: any, res, next) => {
    const requestId = (req.headers[requestIdHeader] as string) || randomUUID();
    req.requestId = requestId;
    res.setHeader(HEADER_REQUEST_ID, requestId);
    next();
  });

  // Correlation ID propagation
  app.use((req: any, res, next) => {
    const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
    req.correlationId = correlationId;
    res.setHeader(HEADER_CORRELATION_ID, correlationId);
    next();
  });

  // Maintenance mode (always allow health probes through)
  if (envBool('MAINTENANCE_MODE')) {
    app.use((req: any, res, next) => {
      if (req.url && req.url.startsWith('/api/health')) {
        return next();
      }
      res.status(503).json({ statusCode: 503, message: 'Service temporarily unavailable' });
    });
  }

  // Global API prefix
  app.setGlobalPrefix('api');

  // Enable CORS
  const corsOrigin = process.env.CORS_ORIGIN || '*';
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: true,
    maxAge: envInt('CORS_MAX_AGE', 86400),
  });

  // Set request timeout (30 seconds default)
  const timeout = envInt('REQUEST_TIMEOUT', DEFAULT_REQUEST_TIMEOUT_MS);
  app.use((req, res, next) => {
    req.setTimeout(timeout);
    res.setTimeout(timeout);
    next();
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger configuration (optional via env)
  const swaggerEnabled = envBool('SWAGGER_ENABLED', true);
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Auth API')
      .setDescription('A comprehensive authentication API built with NestJS')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { jsonDocumentUrl: 'api-json' });
  }

  const port = envInt('PORT', DEFAULT_PORT);
  await app.listen(port);
  logStartupBanner(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  if (isProduction()) {
    logger.log('Running in production mode');
  }
  if (envBool('SWAGGER_ENABLED', true)) {
    logger.log(`Swagger documentation: http://localhost:${port}/api`);
  }
}
bootstrap();
