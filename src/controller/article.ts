import { articleService } from '../service';
import { getRepository } from 'typeorm';
import { Article } from 'entity';

interface ArticleCreateDto {
  content: string;
  tagIds: number[];
  published?: boolean;
}

export const articleController = {
  async create(ctx) {
    const { id: userId } = ctx.state.user;
    const { content } = ctx.request.body;
    const tagIds = ctx.request.body.tagIds || [];
    const articleRepo = getRepository(Article);
    const article = articleRepo.create({ content, userId });
    try {
      await articleRepo.save(article);
      ctx.body = {
        article,
      };
    } catch (e) {
      ctx.body = {
        error: e,
      };
    }
  },
  async edit(ctx) {},
  async findOneById(ctx) {
    // select  a.content, (select group_concat(m.tagId) from mapping_article_tag as m where m.articleId = a.id) as 'tagIds' from article as a
    const { id } = ctx.params;
    const article = await articleService.findOneById(id);
    ctx.body = {
      article,
    };
  },
};
