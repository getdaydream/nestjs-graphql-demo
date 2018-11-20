import Router from 'koa-router';

import {
  bookController,
  collectionController,
  tagController,
  userController,
  articleController,
  movieController,
  fileController,
  annotationController,
  cheatsheetController,
} from './controller';

const router = new Router();

router.prefix('/api');

router.post('/auth/login', userController.login);
router.post('/users', userController.create);

router.get('/tags', tagController.find);
router.get('/tags/:id', tagController.findById);
router.post('/tags', tagController.create);

router.get('/articles', articleController.find);
router.get('/articles/:id', articleController.findOneById);
router.post('/articles', articleController.create);
router.put('/articles/:id/update', articleController.update);
router.put('/articles/:id/publish', articleController.publish);

router.post('/movies', movieController.create);
// TODO 将search的接口合并
router.get('/movies/search', movieController.search);
router.get('/movies/:id', movieController.findOne);

router.post('/books', bookController.create);
router.get('/books/search', bookController.search);
router.get('/books/:id', bookController.findOne);

router.post('/collections', collectionController.add);
router.delete('/collections/:id', collectionController.delete);

router.get('/files/uploadToken', fileController.certificate);
router.post('/files', fileController.publish);

router.post('/annotation', annotationController.create);
router.get('/annotation/:id', annotationController.findOne);

router.get('/cheatsheet/:id', cheatsheetController.findOne);
router.post('/cheatsheet', cheatsheetController.create);
router.put('/cheatsheet', cheatsheetController.update);

export { router };
