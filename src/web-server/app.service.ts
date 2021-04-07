import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUptime(start: number): string {
    return Number((Date.now() - start) / 1000).toFixed(3);
  }
}
