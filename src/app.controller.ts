import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus(): string {
    return 'API is running successfully';
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
