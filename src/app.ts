import * as Koa from 'koa';
// https://github.com/koajs/bodyparser
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as jwt from 'koa-jwt';
import { router } from './router';
import { DatabaseConnection } from './connection';

import 'reflect-metadata';
import { config } from 'config';

DatabaseConnection.open();

// 添加beforeStart
const app = new Koa();

app.use(logger());
// app.use(jwt({ secret: config.tokenSecret })
//   .unless({ path: [/^\/api\/users/, /^\/api\/auth/] }));
app.use(bodyParser());

app.use(router.routes());

export const server = app.listen(3000);
