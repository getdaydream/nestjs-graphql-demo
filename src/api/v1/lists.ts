import * as Router from 'koa-router';
import * as _ from 'lodash';
import { List } from '../../model/list';
import { Movie } from '../../model/movie';
import { MOVIE_BASIC_KEYS } from './movies';

export const router = new Router();

router.post('/', async ctx => {
  const { id } = ctx.state.user;
  const { project, resource } = ctx.request.body;
  const list = new List({
    ownerID: id,
    project,
    resource,
  });
  const product = await list.save();
  ctx.body = {
    success: '创建清单成功',
    list: product,
  };
});

router.get('/', async ctx => {
  const { id } = ctx.state.user;
  const lists = await List.find({ ownerID: id });
  for (const list of lists) {
    if (list['project'] === 'movie') {
      const movie = await Movie.findById(list['resource']);
      console.log(movie['title']);
      _.assign(list, { resource: _.pick(movie, MOVIE_BASIC_KEYS) });
      console.log(list);
    }
  }
  console.log(lists);
  console.log('hre');
  ctx.body = {
    success: '请求清单成功',
    lists,
  };
});
