import { getRepository } from 'typeorm';
import { Annotation } from 'entity';

export const annotationController = {
  async create(ctx) {
    const { id: user_id } = ctx.state.user;
    const { bookId, content, comment, position } = ctx.request.body;
    const repo = getRepository(Annotation);
    const annotation = repo.create({
      book_id: bookId,
      user_id,
      position,
      content,
      comment,
    });
    await repo.save(annotation);
    ctx.body = annotation;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const repo = getRepository(Annotation);
    const annotation = await repo.findOne({ id });
    ctx.body = annotation;
  },
};
