import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Seja bem-vindo ao projeto Nest JS na DigitalOcean!!!!</h1>`;
  }

  soma(a, b) {
    return a + b;
  }
}
