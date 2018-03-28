/**
 * 上传图片
 */
import * as Router from 'koa-router';

export const router = new Router();

router.post('/', async ctx => {
  console.log(ctx.request['body']);
});