import * as Router from 'koa-router';

import { tagController } from './controller/tag';
import { userController } from 'controller/user';

const router = new Router();

router.prefix('/api');

router.post('/user', userController.create);

router.get('/tag', tagController.find);
router.post('/tag', tagController.create);

export { router };
