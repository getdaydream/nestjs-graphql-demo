import got from 'got';
import { Book } from '../entity';
import { getRepository } from 'typeorm';

let count = 0;

// $and: [{ ratingValue: { $gte: 7.5 } },
//   { ratingCount: { $gte: 500 } }],
export const importBooks = async () => {
  const { body } = await got.get('http://127.0.0.1:3000/api/v1/books/transfer');
  const data = JSON.parse(body);
  if (data.message) {
    return;
  }
  try {
    const bookData = {
      id: data.id,
      title: data.title,
      original_title: data.originalTitle || '',
      subtitle: data.subtitle || '',
      pubdate: data.pubdate || '',
      year: data.year || 0,
      cover: data.doubanCover,
      rating_value: data.ratingValue,
      rating_count: data.ratingCount,
      rating_on_weight: data.ratingOnWeight.join(','),
    };
    const bookRepo = getRepository(Book);
    const book = await bookRepo.create(bookData);
    await bookRepo.save(book);
    console.log(book.title);
    console.log(++count);
  } catch (e) {
    console.log(e);
    process.exit();
  }
  importBooks();
};
