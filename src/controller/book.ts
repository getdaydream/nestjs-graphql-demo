import got from 'got';
import _ from 'lodash';
import { getRepository, getManager } from 'typeorm';
import { Book, Collection } from 'entity';
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
    ctx.body = {
      id: book.id,
      title: book.title,
      originalTitle: book.original_title,
      year: book.year,
      cover: book.cover,
      ratingCount: book.rating_count,
      ratingValue: book.rating_value,
    };
  },
  async search(ctx) {
    const { q } = ctx.request.query;
    const books = await getManager().query(`
      select * from book
        where title like '%${q}%'
        order by rating_count desc
        limit 10`);
    ctx.body = books;
  },
  async collect(ctx) {
    const { id, status, comment } = ctx.params;
    const { id: userId } = ctx.state.user;
    let collection: Collection;
    const collectionRepo = getRepository(Collection);
    // TODO 判断该书是否存在
    collection = await collectionRepo.findOne({
      category: 'book',
      targetId: id,
      userId,
    });
    if (collection) {
      collection.status = status;
      collection.comment = comment;
    } else {
      collection = collectionRepo.create({
        category: 'book',
        targetId: id,
        userId,
        status,
        comment,
      });
    }
    await collectionRepo.save(collection);
    ctx.body = collection;
  },
};
