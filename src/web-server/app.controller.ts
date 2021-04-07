import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private start: number;
  constructor(private readonly appService: AppService) {
    this.start = Date.now();
  }

  @Get('healthcheck')
  async getHealthcheck() {
    return {
      uptime: this.appService.getUptime(this.start)
    };
  }
}
