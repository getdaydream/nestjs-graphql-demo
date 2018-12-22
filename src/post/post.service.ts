import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { File } from '@/file/file.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRespository: Repository<Post>,
  ) {}

  async get(id: number) {
    return await this.postRespository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.user_id',
        'post.title',
        'post.description',
        'post.isPrivate',
        'post.creat_at',
        'post.update_at',
      ])
      .where('post.id = :id', { id })
      .leftJoinAndMapOne(
        'post.files',
        File,
        'file',
        'file.id IN (post.fileIds)',
      )
      .leftJoinAndSelect('post.tags', 'tags')
      .getOne();
  }

  async getMany() {
    return await this.postRespository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.isPrivate',
        'post.creat_at',
        'post.update_at',
      ])
      .where({})
      .leftJoinAndMapOne(
        'post.files',
        File,
        'file',
        'file.id IN (post.fileIds)',
      )
      .leftJoinAndSelect('post.tags', 'tags')
      .getMany();
  }

  async create(post: DeepPartial<Post>) {
    return await this.postRespository.save(post);
  }

  async update(post: Post) {
    return await this.postRespository.save(post);
  }

  async delete(criteria: Partial<Post>) {
    return await this.postRespository.delete(criteria);
  }
}
