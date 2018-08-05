import * as got from 'got';
import { MOVIE_SUBTYPE, Movie } from 'entity';
import { getRepository } from 'typeorm';

let count = 0;

// $and: [{ ratingValue: { $gte: 8 } },
//   { ratingCount: { $gte: 2000 } }],
export const importMovies = async () => {
  const { body } = await got.get('http://127.0.0.1:3000/api/v1/movies/transfer');
  const data = JSON.parse(body);
  if (data.message) {
    return;
  }
  const movieData = {
    id: data.id,
    subtype: data.subtype === 'tv' ? MOVIE_SUBTYPE.TV : MOVIE_SUBTYPE.MOVIE,
    title: data.title,
    original_title: data.originalTitle || '',
    year: data.year || 0,
    cover: data.doubanPoster,
    rating_value: data.ratingValue,
    rating_count: data.ratingCount,
    rating_on_weight: data.ratingOnWeight.join(','),
    summary: data.summary || '',
  };
  const movieRepo = getRepository(Movie);
  const movie = await movieRepo.create(movieData);
  await movieRepo.save(movie);
  console.log(movie.title);
  console.log(++count);
  importMovies();
};
