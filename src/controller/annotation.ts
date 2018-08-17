import { getRepository } from 'typeorm';
import { Annotation, Book } from 'entity';

export const annotationController = {
  async create(ctx) {
    const { id: user_id } = ctx.state.user;
    const { content, comment, bookId } = ctx.request.body;
    const repo = getRepository(Annotation);
    const annotation = repo.create({
      book_id: bookId,
      user_id,
      content,
      comment,
    });
    try {
      await repo.save(annotation);
    } catch (e) {
      console.log(e.sql);
    }
    ctx.body = annotation;
  },
};
