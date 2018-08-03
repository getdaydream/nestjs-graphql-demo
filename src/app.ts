import * as Koa from 'koa';
// https://github.com/koajs/bodyparser
import * as bodyParser from 'koa-bodyparser';
import * as koaLogger from 'koa-logger';
import * as jwt from 'koa-jwt';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

import { logger } from './util/logger';
import { router } from './router';
import { DatabaseConnection } from './connection';
import { config } from 'config';

DatabaseConnection.open();

// 添加beforeStart
const app = new Koa();

app.use(koaLogger());
app.use(
  jwt({ secret: config.tokenSecret }).unless({
    path: [/^\/api\/users/, /^\/api\/auth/],
  }),
);
app.use(bodyParser());

app.use(router.routes());

export const server = app.listen(3001);

app.on('error', err => {
  logger.error(err);
});
