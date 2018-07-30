import { articleService } from '../service';

export const articleController = {
  async create() {},
  async edit(ctx) {},
  async findOneById(ctx) {
    const { id } = ctx.params;
    const article = await articleService.findOneById(id);
    ctx.body = {
      article,
    };
  },
};
