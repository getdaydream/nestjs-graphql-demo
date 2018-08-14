import Router from 'koa-router';

import { tagController } from './controller/tag';
import { userController } from './controller/user';
import { articleController } from 'controller/article';
import { movieController } from 'controller/movie';
import { bookController } from 'controller';

const router = new Router();

router.prefix('/api');

router.post('/auth/login', userController.login);
router.post('/users', userController.create);

router.get('/tags', tagController.find);
router.get('/tags/:id', tagController.findById);
router.post('/tags', tagController.create);

router.get('/articles/:id', articleController.findOneById);
router.post('/articles', articleController.create);
router.put('/articles/:id/update', articleController.update);
router.put('/articles/:id/publish', articleController.publish);

router.post('/movies', movieController.create);
router.get('/movies/search', movieController.search);
router.get('/movies/:id', movieController.findOne);

router.post('/books', bookController.create);
router.get('/books/search', bookController.search);
router.get('/books/:id', bookController.findOne);

export { router };
