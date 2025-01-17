import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Enable CORS
  app.enableCors();

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

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('A comprehensive authentication API built with NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
