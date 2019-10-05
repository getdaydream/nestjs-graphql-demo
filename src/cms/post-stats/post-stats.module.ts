import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStats } from './post-stats.entity';
import { PostStatsService } from './post-stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostStats])],
  providers: [PostStatsService],
  exports: [PostStatsService],
})
export class PostStatsModule {}
