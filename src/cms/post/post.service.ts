import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRespository: Repository<Post>,
  ) {}
}
