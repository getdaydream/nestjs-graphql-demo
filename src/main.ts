import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: process.env.ALLOW_ORIGIN,
    origin: true,
    credentials: true,
  });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(morgan('dev'));
  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  app.use(cookieParser());
  // 自动验证参数
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
