/**
 *
 */
import * as Router from 'koa-router';
import * as got from 'got';
import { Movie } from '../../model/movie';
import * as _ from 'lodash';
import { MovieParser } from '../../spider/movie-parser';

export const router = new Router();

// 返回电影条目中的基本字段
export const MOVIE_BASIC_KEYS = [
  'id',
  'title',
  'year',
  'poster',
  'ratingValue'
];

// 返回电影条目中的完整字段
export const MOVIE_KEYS = [
  'id',
  'title',
  'originalTitle',
  'aka',
  'year',
  'subtype',
  'ratingValue',
  'ratingCount',
  'ratingOnWeight',
  'poster',
  'directors',
  'writers',
  'casts',
  'countries',
  'languages',
  'genres',
  'durations',
  'pubDates',
  'summary',
  'recommendations',
  'userTags',
  'imdbID'
];

const doubanMovieBaseUrl = 'https://movie.douban.com/subject/';

/**
 * @param id 如果有id，直接返回相应电影的详细信息
 * @returns movies
 */
router.get('/', async ctx => {
  const { id } = ctx.query;
  if (id) {
    try {
      const movie = await Movie.findOne({ id });
      if (movie) {
        ctx.body = {
          success: '查找电影成功',
          movies: [_.pick(movie, MOVIE_KEYS)]
        };
      } else {
        ctx.body = {
          error: '不存在的电影'
        };
      }
    } catch (e) {
      ctx.body = {
        error: e
      };
    }
  } else {
    try {
      const movies = await Movie.find({})
        .sort({ ratingCount: 'desc' })
        .limit(10);
      ctx.body = {
        success: '查找电影成功',
        movies: movies.map(movie => _.pick(movie, MOVIE_BASIC_KEYS))
      };
    } catch (e) {
      ctx.body = {
        error: e
      };
    }
  }
});

router.post('/', async ctx => {
  const { id } = ctx.request.body;
  try {
    const { body } = await got.get(`${doubanMovieBaseUrl}${id}`);
    const doubanMovie = new MovieParser(body);
    const data = _.pick(doubanMovie, MOVIE_KEYS);
    if (data.id && data.title && data.year) {
      const movie = new Movie(data);
      const doc = await movie.save();
      ctx.body = {
        success: '创建电影成功',
        movie: _.pick(doc, MOVIE_KEYS)
      };
    } else {
      ctx.body = {
        error: '未请求到相应数据'
      };
    }
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});
