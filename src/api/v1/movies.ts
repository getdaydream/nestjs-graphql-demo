/**
 *
 */
import * as Router from 'koa-router';
import * as got from 'got';
import { Movie } from '../../model/movie';
import * as _ from 'lodash';

export const router = new Router();

const doubanMovieApiUrl = 'http://api.douban.com/v2/movie/subject/';

// 返回电影条目中的基本字段
const MOVIE_BASIC_KEYS = ['id', 'title', 'year', 'poster', 'ratingValue'];

// 返回电影条目中的完整字段
const MOVIE_KEYS = [
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

/**
 * id: 如果有id，直接返回相应的文档
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
    const resp = await got.get(`${doubanMovieApiUrl}${id}`);
    const movieData = JSON.parse(resp.body);
    const movie = new Movie({
      id,
      title: movieData.title,
      original_title: movieData.original_title,
      aka: movieData.aka,
      year: movieData.year,
      ratingValue: movieData.rating.average,
      ratingCount: movieData.ratings_count,
      poster: movieData.images.large,
      countries: movieData.countries,
      genres: movieData.genres,
      subtype: movieData.subtype,
      summary: movieData.summary
    });
    const result = await movie.save();
    ctx.body = {
      success: '创建电影数据成功',
      movie: result
    };
  } catch (e) {
    console.log(e);
  }
});
