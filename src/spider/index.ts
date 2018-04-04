import { Movie } from '../model/movie';
import { MovieParser } from './movie-parser';
import * as _ from 'lodash';

const movieKeys = [
  'title',
  'originalTitle',
  'aka',
  'year',
  'subtype',
  'ratingValue',
  'ratingCount',
  'ratingOnWeight',
  'doubanPoster',
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

let count = 0;

// 解析爬取电影页面的数据
// TODO 并行
export const parseHTML = async () => {
  const movie = await Movie.findOne({
    update_at: { $lt: new Date('2018-4-2') }
    // id: '10512661'
  });
  console.log(movie);
  if (!movie) {
    return false;
  }
  if (movie['html']) {
    const movieParser = new MovieParser(movie['html']);

    const doubanMovie = _.pick(movieParser, movieKeys);
    Object.assign(movie, doubanMovie);
    await movie.save();
  }
  console.log(`总数${++count}`);
  return true;
};

export const runOnce = () => {
  parseHTML().then(isContinue => {
    if (isContinue) {
      runOnce();
    }
  });
};
