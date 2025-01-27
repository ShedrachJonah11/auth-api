import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { AppModule } from './app.module';

async function bootstrap() {
  const logLevel = (process.env.LOG_LEVEL || 'log').split(',') as any;
  const app = await NestFactory.create(AppModule, { logger: logLevel });
  const logger = new Logger('Bootstrap');

  // Request ID propagation
  app.use((req: any, res, next) => {
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    req.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  });

  // Correlation ID propagation
  app.use((req: any, res, next) => {
    const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
  });

  // Maintenance mode
  if (process.env.MAINTENANCE_MODE === 'true') {
    app.use((_req, res) => {
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
    maxAge: parseInt(process.env.CORS_MAX_AGE || '86400', 10),
  });

  // Set request timeout (30 seconds default)
  const timeout = parseInt(process.env.REQUEST_TIMEOUT || '30000', 10);
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
  const swaggerEnabled = process.env.SWAGGER_ENABLED !== 'false';
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Auth API')
      .setDescription('A comprehensive authentication API built with NestJS')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  if (process.env.SWAGGER_ENABLED !== 'false') {
    logger.log(`Swagger documentation: http://localhost:${port}/api`);
  }
}
bootstrap();
