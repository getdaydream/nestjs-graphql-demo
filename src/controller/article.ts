import { articleService } from '../service';
import { getRepository } from 'typeorm';
import { Article } from 'entity';

export const articleController = {
  async create(ctx) {
    const { userId } = ctx.state.user;
    const { content } = ctx.request.body;
    const articleRepo = getRepository(Article);
    const article = articleRepo.create({ content });
  },
  async edit(ctx) { },
  async findOneById(ctx) {
    const { id } = ctx.params;
    const article = await articleService.findOneById(id);
    ctx.body = {
      article,
    };
  },
};
