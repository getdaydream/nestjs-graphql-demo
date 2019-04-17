import { Module } from '@nestjs/common';
import { ArticleModule } from './article';
import { PostStatsModule } from './post-stats';

@Module({
  imports: [ArticleModule, PostStatsModule],
  exports: [ArticleModule, PostStatsModule],
})
export class CMSModule {}
