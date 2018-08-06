import Koa from 'koa';
// https://github.com/koajs/bodyparser
import bodyParser from 'koa-bodyparser';
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

app.use(koaLogger());
app.use(
  jwt({ secret: process.env.TOKEN_SECRET }).unless({
    path: [/^\/api\/users/, /^\/api\/auth/],
  }),
);
app.use(bodyParser());

app.use(router.routes());

export const server = app.listen(3000);

app.on('error', err => {
  logger.error(err);
});
