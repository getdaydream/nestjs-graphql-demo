/**
 * 下载电影的海报
 * 否则同时向豆瓣请求大量图片会被ban
 * 目录为poster
 * 文件名为电影id
 */
import * as got from 'got';
import * as fs from 'fs';
import * as path from 'path';
import { Movie } from '../model/movie';
import { connectMongodb } from '../model/index';

connectMongodb();

const findMovie = async () => {
  const movie = await Movie.findOne({
    // posterCache: { $exists: false },
    // ratingValue: { $gt: 7 },
    // ratingCount: { $gt: 3000 }
    posterCache: 'rejected'
  });
  return movie;
};

let count = 0;
let errorCount = 0;

const download = () => {
  findMovie().then(movie => {
    if (movie) {
      console.log(movie['title']);
      console.log(movie['ratingValue']);
      console.log(movie['ratingCount']);
      got
        .stream(movie['poster'])
        .on('response', () => {
          movie['posterCache'] = 'fulfilled';
          movie.save().then(() => {
            console.log(`count:   ${++count}`);
            setTimeout(() => {
              download();
            }, 1000 + (0.5 - Math.random() * 500));
          });
        })
        .on('error', () => {
          console.log(
            '=========================================================='
          );
          console.log('error');
          console.log(
            '=========================================================='
          );
          console.log(`错误次数 ${++errorCount} ===================`);
          movie['posterCache'] = 'rejected';
          movie.save();
          download();
        })
        .pipe(
          fs.createWriteStream(
            path.join(
              __dirname,
              '../../poster',
              `${movie['id']}${path.extname(movie['poster'])}`
            )
          )
        );
    } else {
      console.log('完成');
    }
  });
};

download();
