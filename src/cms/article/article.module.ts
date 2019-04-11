import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { PostModule } from '../post';

@Module({
  imports: [PostModule],
  providers: [ArticleResolver],
  exports: [ArticleResolver],
})
export class ArticleModule {}
