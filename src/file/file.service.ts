import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository, DeepPartial } from 'typeorm';
import { PostType } from '../post/post.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async get(id: number) {
    return await this.fileRepository.findOne(id);
  }

  async create(file: DeepPartial<File>) {
    return await this.fileRepository.save(file);
  }

  async createDefaultFileForPost(postType: PostType) {
    if (postType === PostType.snippet) {
      return await this.fileRepository.create({
        filename: 'index',
        filetype: 'typescript',
        content: '',
      });
    }
    if (postType === PostType.markdown) {
      return await this.fileRepository.create({
        filename: 'index',
        filetype: 'markdown',
        content: '',
      });
    }
  }
}
