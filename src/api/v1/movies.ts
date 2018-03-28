/**
 * 
 */
import * as Router from 'koa-router';

export const router = new Router();

router.get('/', async ctx => {
  console.log(ctx.query);
});