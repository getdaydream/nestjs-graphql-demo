import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatsModule } from '../post-stats';
import { Article } from './article.entity';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), PostStatsModule],
  providers: [ArticleResolver, ArticleService],
  exports: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
