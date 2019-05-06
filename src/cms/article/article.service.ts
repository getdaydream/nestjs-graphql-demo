import { BaseService } from '@/shared/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PostStats } from '../post-stats';
import { Article } from './article.entity';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    super(articleRepository);
  }

  async updateArticle(article: Article, params: Partial<Article>) {
    return await getConnection().transaction(async manager => {
      let postStats: PostStats;
      if (params.status) {
        postStats = await manager.save(
          PostStats,
          manager.create(PostStats, { postId: article.id }),
        );
      }

      const newArticle = await manager.save(
        Article,
        manager.merge(Article, article, params),
      );
      return { article: newArticle, postStats };
    });
  }
}
