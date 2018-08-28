import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import koaLogger from 'koa-logger';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

import { logger } from './util/logger';
import { router } from './router';
import { DatabaseConnection } from './connection';

DatabaseConnection.open();

// 添加beforeStart
const app = new Koa();

app.use(bodyParser());
app.use(koaLogger());
app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  }),
);

app.use(
  jwt({
    secret: process.env.TOKEN_SECRET,
    cookie: 'token',
  })
  .unless({
    path: [/^\/api\/users/, /^\/api\/auth/],
  }),
);
app.use(router.routes());

export const server = app.listen(3001);

app.on('error', err => {
  logger.error(err);
});
