import * as got from 'got';
import * as _ from 'lodash';
import { MovieParser } from '../util/movie-parser';
import { getRepository } from 'typeorm';
import { Movie, MOVIE_SOURCE } from 'entity/movie';

const MOVIE_KEYS = [
  'id',
  'title',
  'originalTitle',
  'year',
  'cover',
  'ratingValue',
  'ratingCount',
  'ratingOnWeight',
];

const doubanMovieBaseUrl = 'https://movie.douban.com/subject/';

export const movieController = {
  async create(ctx) {
    const { doubanId } = ctx.request.body;
    try {
      const { body } = await got.get(`${doubanMovieBaseUrl}${doubanId}`);
      const doubanMovie = new MovieParser(body);
      const data = _.pick(doubanMovie, MOVIE_KEYS);
      console.log(data);
      const movie = getRepository(Movie).create(Object.assign(data, {source: MOVIE_SOURCE.DOUBAN}));
      console.log(movie);
      await getRepository(Movie).save(movie);
      ctx.body = movie;
    } catch (e) {
      ctx.status = 500;
      ctx.body = e;
    }
  },
};
