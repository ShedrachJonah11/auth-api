import { Module, MiddlewareConsumer, NestModule, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { Connection, getConnectionToken } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AppConfigModule } from './config/config.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { createIndexes } from './database/indexes';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 100, // maximum number of items in cache
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: 60000, // 1 minute
          limit: 10, // 10 requests per minute
        },
      ],
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(@Inject(getConnectionToken()) private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware, LoggingMiddleware)
      .forRoutes('*');
  }

  async onModuleInit() {
    // Create database indexes on module initialization
    await createIndexes(this.connection);
  }
}
