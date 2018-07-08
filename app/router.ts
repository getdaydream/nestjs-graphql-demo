import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/user', controller.user.find);
  router.post('/user', controller.user.create);
};
