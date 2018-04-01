/**
 * router main
 */
import * as Router from 'koa-router';
import { router as images } from '../api/v1/images';
import { router as oauth } from '../api/v1/oauth';
import { router as posts } from '../api/v1/posts';
import { router as users } from '../api/v1/users';
import {router as movies } from '../api/v1/movies';

export const router = new Router({
  prefix: '/api/v1'
});

router.use('/oauth', oauth.routes(), oauth.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/posts', posts.routes(), posts.allowedMethods());
router.use('/images', images.routes(), images.allowedMethods());
router.use('/movies', movies.routes(), movies.allowedMethods());
