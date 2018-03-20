/**
 * router main
 */
import * as Router from 'koa-router';
import { router as oauth } from '../api/v1/oauth';
import { router as users } from '../api/v1/users';

export const router = new Router();

router.use('/oauth', oauth.routes(), oauth.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
