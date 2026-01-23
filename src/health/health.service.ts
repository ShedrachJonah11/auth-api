import { Injectable, Logger } from '@nestjs/common';

// Health checks can be disabled via HEALTH_CHECK_ENABLED=false if needed
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(@InjectConnection() private connection: Connection) {}

  async check() {
    const dbStatus = await this.checkDatabase();
    const memoryUsage = process.memoryUsage();
    
    return {
      status: dbStatus === 'connected' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus,
        connection: this.connection.readyState === 1 ? 'connected' : 'disconnected',
      },
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
      },
      cpu: {
        usage: process.cpuUsage(),
      },
    };
  }

  async ready() {
    const dbStatus = await this.checkDatabase();
    return {
      status: dbStatus === 'connected' ? 'ready' : 'not-ready',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    };
  }

  async summary() {
    const dbStatus = await this.checkDatabase();
    return { db: dbStatus, uptime: Math.floor(process.uptime()) };
  }

  private async checkDatabase(): Promise<string> {
    try {
      if (this.connection.readyState === 1) {
        await this.connection.db.admin().ping();
        return 'connected';
      }
      return 'disconnected';
    } catch (error) {
      this.logger.error('Database health check failed', error as Error);
      return 'error';
    }
  }
}
