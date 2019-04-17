import { BaseService } from '@/shared/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostStats } from './post-stats.entity';

@Injectable()
export class PostStatsService extends BaseService<PostStats> {
  constructor(
    @InjectRepository(PostStats)
    private readonly postStatsRepository: Repository<PostStats>,
  ) {
    super(postStatsRepository);
  }
}
