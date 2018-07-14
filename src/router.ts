import * as Router from 'koa-router';

import { tagController } from './controller/tag';

const router = new Router();

router.prefix('/api');

router.get('/tag', tagController.find);
router.post('/tag', tagController.create);

export { router };
