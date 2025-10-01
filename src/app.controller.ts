import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
