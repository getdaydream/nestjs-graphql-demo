/**
 * router main
 */
import * as Router from 'koa-router';
import { router as images } from '../api/images';
import { router  as lists } from '../api/lists';
import { router as movies } from '../api/movies';
import { router as oauth } from '../api/oauth';
import { router as posts } from '../api/posts';
import { router as users } from '../api/users';

export const router = new Router({
  prefix: '/api/v1',
});

router.use('/oauth', oauth.routes(), oauth.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/posts', posts.routes(), posts.allowedMethods());
router.use('/images', images.routes(), images.allowedMethods());
router.use('/movies', movies.routes(), movies.allowedMethods());
router.use('/lists', lists.routes(), lists.allowedMethods());
