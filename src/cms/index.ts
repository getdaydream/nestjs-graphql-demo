import { Module } from '@nestjs/common';
import { PostModule } from './post';
import { ArticleModule } from './article';

@Module({
  imports: [PostModule, ArticleModule],
  exports: [PostModule, ArticleModule],
})
export class CMSModule {}
