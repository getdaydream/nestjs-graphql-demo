import { BaseService } from '@/shared/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PostStats } from '../post-stats';
import { TextContent } from '../text-content';
import { Article } from './article.entity';
import { ArticleStatus } from './article.interface';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    super(articleRepository);
  }

  async createArticle(articleParams: Partial<Article>, content: string) {
    return await getConnection().transaction(async manager => {
      const article = await manager.save(Article, articleParams);
      const textContent = await manager.save(TextContent, {
        postId: article.id,
        userId: article.userId,
        content,
      });
      return { article, textContent };
    });
  }

  // TODO: can modify after publish ?
  async updateArticle(params: Partial<Article> & { id: number }) {
    const { id } = params;
    return await getConnection().transaction(async manager => {
      const article = await manager.save(Article, params);
      const postStats = await manager.save(PostStats, { postId: id });
      return { article, postStats };
    });
  }
}
