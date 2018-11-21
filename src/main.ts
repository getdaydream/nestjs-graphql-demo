import { config as configProcessEnv } from 'dotenv';
// .env
configProcessEnv();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 自动验证参数
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
