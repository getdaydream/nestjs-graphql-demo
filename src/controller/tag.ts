import { Tag } from '../entity';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { tagService } from '../service/tag';
import { userService } from 'service';

export const tagController = {
  async create(ctx) {
    const { name } = ctx.request.body;
    const { id: userId } = ctx.state.user;
    if (await tagService.tagExists(name)) {
      return (ctx.body = {
        error: 'duplicate tag name',
      });
    }
    const tagRepo = getRepository(Tag);
    const tag = tagRepo.create({ name, userId });
    try {
      const res = await tagRepo.save(tag);
      ctx.body = {
        tag: res,
      };
    } catch (e) {
      console.log(e);
    }
  },
  async findById(ctx) {
    const tag = await tagService.findById(ctx.params.id);
    ctx.body = {
      tag,
    };
  },
  async find(ctx: Context) {
    const tags = await tagService.findAll();
    ctx.body = {
      tags,
    };
  },
};
