import got from 'got';
import _ from 'lodash';
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
    // const { doubanId } = ctx.request.body;
    // const movieRepo = getRepository(Movie);
    // if (await movieRepo.findOne({ id: doubanId })) {
    //   ctx.body = {
    //     error: 'duplicate id',
    //   };
    //   return;
    // }
    // try {
    //   const { body } = await got.get(`${doubanMovieBaseUrl}${doubanId}`);
    //   const doubanMovie = new MovieParser(body);
    //   const data = _.pick(doubanMovie, MOVIE_KEYS);
    //   const movie = movieRepo.create(data);
    //   await movieRepo.save(movie);
    //   ctx.body = movie;
    // } catch (e) {
    //   ctx.status = 500;
    //   ctx.body = e;
    // }
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const movie = await getRepository(Movie).findOne({ id });
    ctx.body = {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      year: movie.year,
      cover: movie.cover,
      ratingCount: movie.rating_count,
      ratingValue: movie.rating_value,
    };
  },
};
