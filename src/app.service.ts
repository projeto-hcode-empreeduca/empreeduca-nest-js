import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${this.soma(1, 2)}`;
  }

  soma(a, b) {
    return a + b;
  }
}
