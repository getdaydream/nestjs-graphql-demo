import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
// TODO:
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  // app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: process.env.ALLOW_ORIGIN,
    origin: true,
    credentials: true,
  });
  app.use(morgan('dev'));
  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  app.use(cookieParser());
  // auto validate params
  app.useGlobalPipes(new ValidationPipe());
  // https://github.com/APIs-guru/graphql-voyager
  app.use('/model-graph', voyagerMiddleware({ endpointUrl: '/graphql' }));
  await app.listen(3000);
}

bootstrap();
