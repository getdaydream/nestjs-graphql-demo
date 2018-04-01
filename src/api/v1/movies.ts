/**
 *
 */
import * as Router from 'koa-router';
import * as got from 'got';
import { Movie } from '../../model/movie';

export const router = new Router();

const doubanMovieApiUrl = 'http://api.douban.com/v2/movie/subject/';

router.get('/', async ctx => {
  const { id } = ctx.query;
  console.log(id);
  if (id) {
    try {
      const movie = await Movie.findOne({ id });
      console.log(movie)
      if (movie) {
        ctx.body = {
          success: '查找电影成功',
          movies: [formatMovie(movie)]
        };
      }
    } catch (e) {
      console.log(e);
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

const formatMovie = movieDocument => {
  return {
    id: movieDocument.id,
    title: movieDocument.title,
    original_title: movieDocument.original_title,
    aka: movieDocument.aka,
    year: movieDocument.year,
    ratingValue: movieDocument.ratingValue,
    ratingCount: movieDocument.ratingCount,
    poster: movieDocument.poster,
    countries: movieDocument.countries,
    genres: movieDocument.genres,
    subtype: movieDocument.subtype,
    summary: movieDocument.summary
  };
};
