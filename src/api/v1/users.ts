/**
 *
 */
import * as Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  ctx.body = { result: 'success' };
});

// 用户注册
router.post('/', async ctx => {
  ctx.body = { result: 'success' };
});

// 用户登录
router.post('/login', async ctx => {
  ctx.body = { result: 'success' };
});

router.put('/');

export { router };
