import { getRepository } from 'typeorm';
import { Article, Tag } from 'entity';

interface ArticleCreateDto {
  content: string;
  tagIds: number[];
  published?: boolean;
}

export const articleController = {
  async create(ctx) {
    const { id: userId } = ctx.state.user;
    const { content } = ctx.request.body;
    const tagIds: number[] = ctx.request.body.tagIds || [];
    const articleRepo = getRepository(Article);
    const article = articleRepo.create({
      content,
      userId,
      tags: tagIds.map(tagId => {
        const tag = new Tag();
        tag.id = tagId;
        return tag;
      }),
    });
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
  async edit(ctx) { },
  async findOneById(ctx) {
    // select  a.content, (select group_concat(m.tagId) from mapping_article_tag as m where m.articleId = a.id) as 'tagIds' from article as a
    const { id } = ctx.params;
    const article = await getRepository(Article)
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.tags', 'tag')
      .printSql()
      .getOne();
    ctx.body = {
      article,
    };
  },
};
