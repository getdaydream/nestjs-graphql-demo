import validator from 'validator';
import { getRepository, getConnection } from 'typeorm';
import { Article, Tag } from 'entity';

interface ArticleCreateDto {
  content: string;
  tagIds: number[];
  published?: boolean;
}

export const articleController = {
  async create(ctx) {
    // TODO: 参数验证
    const title = validator.trim(ctx.request.body.title || '');
    const content = validator.trim(ctx.request.body.content || '');
    const { category, resourceId: resource_id } = ctx.request.body;

    const articleRepo = getRepository(Article);
    const { id: user_id } = ctx.state.user;
    const article = articleRepo.create({
      category,
      resource_id,
      title,
      content,
      user_id,
    });
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Article)
      .values([article])
      .execute();
    ctx.body = article;
  },
  async publish(ctx) {
    const { id } = ctx.request.body;
    const articleRepo = getRepository(Article);
    const article = await articleRepo.findOne({ id });
    article.published = true;
    await articleRepo.save(article);
    ctx.body = article;
  },
  async update(ctx) {
    // 只能本人修改
    const { id: userId } = ctx.state.user;
    const { content, title } = ctx.request.body;
    const { id } = ctx.params;
    const tags: number[] = ctx.request.body.tags || [];

    const articleRepo = getRepository(Article);
    const article = await articleRepo.findOne({ id });
    const newArticle = { content, title };
    Object.assign(article, newArticle);
    article.tags = tags.map(v => {
      const tag = new Tag();
      tag.id = v;
      return tag;
    });
    await articleRepo.save(article);
    ctx.body = article;
  },
  async findOneById(ctx) {
    // select  a.content, (select group_concat(m.tagId) from mapping_article_tag as m where m.articleId = a.id) as 'tagIds' from article as a
    const { id } = ctx.params;
    const article = await getRepository(Article)
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.tags', 'tags')
      .getOne();
    ctx.body = article;
  },
  async find(ctx) {
    const { offset, limit } = ctx.request.query;
  },
};
