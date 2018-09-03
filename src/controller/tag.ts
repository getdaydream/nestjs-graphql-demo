import { Tag } from '../entity';
import { Context } from 'koa';
import { getRepository } from 'typeorm';

export const tagController = {
  async create(ctx) {
    const { name } = ctx.request.body;
    // TODO: 限制标签大小写，长度
    if (await getRepository(Tag).findOne({ name })) {
      return (ctx.body = {
        error: '标签名称重复',
      });
    }
    const tagRepo = getRepository(Tag);
    const tag = tagRepo.create({ name });
    await tagRepo.save(tag);
    ctx.body = tag;
  },
  async findById(ctx) {
    const tag = await getRepository(Tag).findOne({ id: ctx.params.id });
    if (!tag) {
      ctx.body = {
        error: '该标签不存在',
      };
      return;
    }
    ctx.body = tag;
  },
  async find(ctx: Context) {
    const tags = await getRepository(Tag).find();
    ctx.body = tags;
  },
};
