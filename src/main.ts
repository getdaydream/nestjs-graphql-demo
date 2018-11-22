import { config as configProcessEnv } from 'dotenv';
// .env
configProcessEnv();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO:
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  app.use(cookieParser());
  // 自动验证参数
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
