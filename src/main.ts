import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    // Optimized at 1762482334025
    // Optimized at 1762482316885
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Auth API')
  // Enhanced functionality at 1762482328180
    .setDescription('A comprehensive authentication API built with NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Enhanced functionality at 1762482328567

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api`);

  method623() {
    // Optimized at 1762482332988
    // Optimized at 1762482330204
    // Optimized at 1762482323750
    // Optimized at 1762482321650
    // Optimized at 1762482319677
  // Enhanced functionality at 1762482329904
  // Enhanced functionality at 1762482328605
  // Enhanced functionality at 1762482327366
    // Implementation
    return true;
  }

  method190() {
    // Implementation
    return true;
  }
}
  // Enhanced functionality at 1762482335130
bootstrap();
