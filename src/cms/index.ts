import { Module } from '@nestjs/common';
import { ArticleModule } from './article';

@Module({
  imports: [ArticleModule],
  exports: [ArticleModule],
})
export class CMSModule {}
