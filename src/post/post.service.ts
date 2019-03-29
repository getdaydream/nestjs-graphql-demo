import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { File } from '../file';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRespository: Repository<Post>,
    @InjectRepository(File) private readonly fileRespository: Repository<File>,
  ) {}

  async get(conditions: Partial<Post>) {
    return (await this.postRespository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.type',
        'post.folder_id',
        'post.title',
        'post.description',
        'post.is_private',
        'post.creat_at',
        'post.update_at',
      ])
      .leftJoinAndMapMany(
        'post.files',
        File,
        'file',
        `FIND_IN_SET(file.id, post.file_ids)`,
      )
      .where(conditions)
      .getOne()) as Partial<Post> & { files: File[] };
  }

  async getOne(conditions: Partial<Post>) {
    return await this.postRespository.findOne(conditions);
  }

  async getMany(conditions: Partial<Post>) {
    /**
     * ```sql
     * SELECT post.id AS post_id, file.id AS file_id
     * FROM post
     *        LEFT JOIN file ON FIND_IN_SET(file.id, post.file_ids)
     * WHERE post.user_id = 1
     *   AND post.folder_id = 0
     * ```
     */
    return await this.postRespository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.type',
        'post.folder_id',
        'post.title',
        'post.description',
        'post.is_private',
        'post.creat_at',
        'post.update_at',
      ])
      .leftJoinAndMapMany(
        'post.files',
        File,
        'file',
        `FIND_IN_SET(file.id, post.file_ids)`,
      )
      .where(conditions)
      .orderBy('post.update_at', 'DESC')
      .getMany();
  }

  async save(post: DeepPartial<Post>) {
    return await this.postRespository.save(post);
  }

  async delete(criteria: Partial<Post>) {
    return await this.postRespository.delete(criteria);
  }

  async getPostFiles(postId: number, userId: number) {
    const post = await this.postRespository.findOne({
      id: postId,
      user_id: userId,
    });
    if (post) {
      return await this.fileRespository
        .createQueryBuilder('file')
        .getMany();
    }
    return null;
  }
}
