import Koa from 'koa';
// https://github.com/koajs/bodyparser
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

app.keys = ['im a newer secret', 'i like turtle'];

app.use(bodyParser());
app.use(koaLogger());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
);

app.use(
  jwt({ secret: process.env.TOKEN_SECRET }).unless({
    path: [/^\/api\/users/, /^\/api\/auth/],
  }),
);
app.use(router.routes());

export const server = app.listen(3001);

app.on('error', err => {
  logger.error(err);
});
