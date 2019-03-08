import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as morgan from 'morgan';
import * as Next from 'next';
import { RenderModule } from 'nest-next';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = Next({ dev });

  await nextApp.prepare();

  const server = await NestFactory.create(AppModule);

  const renderer = server.get(RenderModule);
  renderer.register(server, nextApp);

  // TODO: @nestjs/swagger

  // server.setGlobalPrefix('api');
  server.enableCors({
    // origin: process.env.ALLOW_ORIGIN,
    origin: true,
    credentials: true,
  });
  server.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  server.use(morgan('dev'));
  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  server.use(cookieParser());
  // 自动验证参数
  server.useGlobalPipes(new ValidationPipe());
  await server.listen(3000);
}

bootstrap();
