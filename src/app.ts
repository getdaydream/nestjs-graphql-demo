/**
 * app main
 */
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as jwt from 'koa-jwt';
import * as logger from 'koa-logger';
import * as serve from 'koa-static';
import * as cors from 'koa2-cors';
import * as path from 'path';

import { config } from './config';
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

// serve static file
app.use(serve(path.resolve(__dirname, '../upload/')));
app.use(serve(path.resolve(__dirname, '../static/')));

// Middleware below this line is only reached if JWT token is valid
// If the token is valid, ctx.state.user (by default)
// will be set with the JSON object decoded to be used by later middleware
// for authorization and access control.
app.use(
  jwt({
    secret: config.secretKey,
  }).unless({
    path: [
      /^\/api\/v1\/oauth/,
      /^\/api\/v1\/users\/login/,
      /^\/api\/v1\/users\/signup/,
      /^\/upload/,
    ],
  }),
);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
    },
  }),
);

app.use(logger());

// route
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
