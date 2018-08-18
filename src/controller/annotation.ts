import { getRepository } from 'typeorm';
import { Annotation } from 'entity';

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
    await repo.save(annotation);
    ctx.body = annotation;
  },
};
