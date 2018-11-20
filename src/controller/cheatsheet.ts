import { getRepository } from 'typeorm';
import { Cheatsheet } from 'src/entity/cheatsheet';

export const cheatsheetController = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const repo = getRepository(Cheatsheet);
    const cheatsheet = await repo.findOne({ id });
    ctx.body = cheatsheet;
  },
  async create(ctx) {
    const { project } = ctx.request.body;
    const { id: user_id } = ctx.state.user;
    const cheatsheetRepo = await getRepository(Cheatsheet);
    const cheatsheet = cheatsheetRepo.create({ user_id, project });
    await cheatsheetRepo.save(cheatsheet);
    ctx.body = cheatsheet;
  },
  async update(ctx) {
    const { id, project } = ctx.request.body;
    const cheatsheetRepo = await getRepository(Cheatsheet);
    const cheatsheet = await cheatsheetRepo
      .createQueryBuilder('cheatsheet')
      .where('cheatsheet.id = :id', { id })
      .addSelect('cheatsheet.user_id')
      .getOne();
    if (!cheatsheet) {
      ctx.body = {
        error: `不存在id为${id}的cheatsheet`,
      };
      return;
    }
    const { id: userId } = ctx.state.user;
    if (String(cheatsheet.user_id) !== String(userId)) {
      ctx.body = {
        error: '抱歉，你无权修改该cheatsheet',
      };
      return;
    }
    Object.assign(cheatsheet, { project });
    await cheatsheetRepo.save(cheatsheet);
    ctx.body = cheatsheet;
  },
};
