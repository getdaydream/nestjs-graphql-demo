import { Tag } from '../entity';
import { Context } from 'koa';
import { getRepository } from 'typeorm';

export const tagController = {
  async create(ctx) {
    const { name } = ctx.request.body;
    const { id: userId } = ctx.state.user;
    if (await getRepository(Tag).findOne({ name })) {
      return (ctx.body = {
        error: 'duplicate tag name',
      });
    }
    const tagRepo = getRepository(Tag);
    const tag = tagRepo.create({ name, userId });
    try {
      await tagRepo.save(tag);
      ctx.body = tag;
    } catch (e) {
      ctx.body = e;
    }
  },
  async findById(ctx) {
    const tag = await getRepository(Tag).findOne({ id: ctx.params.id });
    ctx.body = tag;
  },
  async find(ctx: Context) {
    const tags = await getRepository(Tag).find();
    ctx.body = tags;
  },
};
