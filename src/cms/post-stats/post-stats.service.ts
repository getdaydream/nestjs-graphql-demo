import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostStats } from './post-stats.entity';

@Injectable()
export class PostStatsService {
  constructor(
    @InjectRepository(PostStats)
    private readonly postStatsRepository: Repository<PostStats>,
  ) {}

  async newPostStats(postId: number) {
    return await this.postStatsRepository.save({ postId });
  }
}
