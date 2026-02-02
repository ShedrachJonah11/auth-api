import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  @ApiOperation({ summary: 'Return service name and version' })
  getVersion() {
    return {
      name: 'auth-api',
      version: process.env.npm_package_version || '0.0.0',
      env: process.env.NODE_ENV || 'development',
    };
  }

  @Get('status')
  getStatus(): object {
    return {
      success: true,
      message: 'API is running successfully',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  getHealth(): string {
    return 'Service is healthy!';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
