import got from 'got';
import _ from 'lodash';
import { getRepository } from 'typeorm';
import { Book } from 'entity';
import { BookParser } from 'util/book-parser';

const BOOK_KEYS = [
  'id',
  'title',
  'originalTitle',
  'subtitle',
  'pubdate',
  'year',
  'cover',
  'ratingValue',
  'ratingCount',
  'ratingOnWeight',
];

const doubanBookBaseUrl = 'https://book.douban.com/subject/';

export const bookController = {
  async create(ctx) {
    const { doubanId } = ctx.request.body;
    const bookRepo = getRepository(Book);
    if (await bookRepo.findOne({ id: doubanId })) {
      ctx.body = { error: 'duplicate id' };
      return;
    }
    try {
      const { body } = await got.get(`${doubanBookBaseUrl}${doubanId}`);
      const doubanBook = new BookParser(body);
      const data = _.pick(doubanBook, BOOK_KEYS);
      const book = bookRepo.create(data);
      // book.id = doubanId;
      await bookRepo.save(book);
      ctx.body = book;
    } catch (e) {
      ctx.status = 500;
      ctx.body = e;
      throw(e);
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const book = await getRepository(Book).findOne({ id });
    ctx.body = book;
  },
};
