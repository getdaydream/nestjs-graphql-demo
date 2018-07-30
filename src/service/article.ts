import { getRepository } from 'typeorm';
import { Article } from '../entity';

export const articleService = {
  async publish() {},
  async findOneById(id) {
    const articleRepo = getRepository(Article);
    const article = await articleRepo.findOne({ id });
    return article;
  },
};
