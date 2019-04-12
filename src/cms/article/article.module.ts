import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { PostModule } from '@/cms/post';

@Module({
  imports: [PostModule],
  providers: [ArticleResolver],
  exports: [ArticleResolver],
})
export class ArticleModule {}
