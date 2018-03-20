/**
 * app main
 */
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';
import * as cors from 'koa2-cors';

import { config } from './config';
import { logger } from './middleware/logger';
import { connectMongodb } from './model/index';
import { router } from './route/index';

connectMongodb()
  .then(() => {
    console.log('connect mongodb success');
  })
  .catch(e => {
    console.log(`connect mongodb failed ${e}`);
  });

const app = new Koa();

// allow cross domain
app.use(cors({ origin: '*' }));

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({
  secret: config.JWT_SECRECT
}).unless({
  path: [/^\/v1\/oauth/, /^\/v1\/users\/login/,/^\/v1\/users\/signup/]
}));

app.use(logger);

// route
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
