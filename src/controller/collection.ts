import { getRepository } from 'typeorm';
import { Collection } from 'entity';

export const collectionController = {
  async add(ctx) {
    const { category, targetId: target_id, status, comment } = ctx.request.body;
    const {id: user_id} = ctx.state.user;
    const collectionRepo = getRepository(Collection);
    const collection = collectionRepo.create({
      user_id,
      category,
      target_id,
      status,
      comment,
    });
    await collectionRepo.save(collection);
    ctx.body = collection;
  },
  async update() {},
  async delete(ctx) {
    const { id: user_id } = ctx.state.user;
    const id = ctx.params.id;
    const repo = getRepository(Collection);
    const collection = await repo.delete(id);
    ctx.body = collection;
  },
};
