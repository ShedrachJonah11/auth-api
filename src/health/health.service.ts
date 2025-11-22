import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthService {
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

  private async checkDatabase(): Promise<string> {
    try {
      if (this.connection.readyState === 1) {
        await this.connection.db.admin().ping();
        return 'connected';
      }
      return 'disconnected';
    } catch (error) {
      return 'error';
    }
  }
}
