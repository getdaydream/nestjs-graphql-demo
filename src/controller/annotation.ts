import { getRepository } from 'typeorm';
import { Annotation, Book } from 'entity';

export const annotationController = {
  async create(ctx) {
    const { bookId } = ctx.request.body;

    const bookRepo = getRepository(Book);
    const book = await bookRepo.findOne({ id: bookId });
    if (!book) {
      ctx.body = {
        error: `不存在id为${bookId}的图书`,
      };
      return;
    }

    const { id: user_id } = ctx.state.user;
    const { content, comment, position } = ctx.request.body;

    const annoRepo = getRepository(Annotation);
    const annotation = annoRepo.create({
      book_id: bookId,
      user_id,
      position,
      content,
      comment,
    });
    await annoRepo.save(annotation);
    ctx.body = annotation;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const repo = getRepository(Annotation);
    const annotation = await repo.findOne({ id });
    ctx.body = annotation;
  },
};
