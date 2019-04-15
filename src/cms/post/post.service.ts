import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRespository: Repository<Post>,
  ) {}

  async get(id: number) {
    return await this.postRespository.findOne(id);
  }

  async find(conditions: Partial<Post>) {
    return await this.postRespository.find(conditions);
  }

  async save(post: Partial<Post>) {
    return await this.postRespository.save(post);
  }
}
