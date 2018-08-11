import { getRepository, getConnection } from 'typeorm';
import { Article, Tag } from 'entity';

interface ArticleCreateDto {
  content: string;
  tagIds: number[];
  published?: boolean;
}

export const articleController = {
  async create(ctx) {
    const { id: userId } = ctx.state.user;
    const { content, title } = ctx.request.body;
    const tagIds: number[] = ctx.request.body.tagIds || [];
    const articleRepo = getRepository(Article);
    const article = articleRepo.create({
      title,
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
      ctx.body = article;
    } catch (e) {
      ctx.body = e;
    }
  },
  async publish(ctx) {
    const { id } = ctx.request.body;
    const articleRepo = getRepository(Article);
    const article = await articleRepo.findOne({ id });
    article.published = true;
    await articleRepo.save(article);
    ctx.body = article;
  },
  async edit(ctx) {
    // 只能本人修改
    const { id: userId } = ctx.state.user;
    const { id, content, title } = ctx.request.body;
    console.log(id);
    const articleRepo = getRepository(Article);
    const article = await articleRepo.findOne({ id });
    console.log(article);
    Object.assign(article, { content, title });
    await articleRepo.save(article);
    ctx.body = article;
  },
  async findOneById(ctx) {
    // select  a.content, (select group_concat(m.tagId) from mapping_article_tag as m where m.articleId = a.id) as 'tagIds' from article as a
    const { id } = ctx.params;
    console.log(id);
    const article = await getRepository(Article).findOne({ id });
    // .createQueryBuilder('article')
    // .where('article.id = :id', { id });
    // .leftJoinAndSelect('article.tags', 'tag');
    // .getSql();
    ctx.body = article;
  },
};
