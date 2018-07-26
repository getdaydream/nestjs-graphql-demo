import * as Koa from 'koa';
// https://github.com/koajs/bodyparser
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import { router } from './router';
import { DatabaseConnection } from './connection';
import 'reflect-metadata';

DatabaseConnection.open();

// 添加beforeStart
const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(router.routes());

export const server = app.listen(3000);
