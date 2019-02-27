import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Filetype } from './file.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async get(id: number) {
    return await this.fileRepository.findOne(id);
  }

  async save(condition: DeepPartial<File>) {
    return await this.fileRepository.save(condition);
  }

  async delete(condition: DeepPartial<File>) {
    return await this.fileRepository.delete(condition);
  }

  async saveDefaultFileForPost(filetype: Filetype) {
    return await this.fileRepository.save({
      filename: '',
      content: '',
      filetype,
    });
  }

  createDefaultFileForPost(filetype: Filetype) {
    return this.fileRepository.create({
      filename: '',
      content: '',
      filetype,
    });
  }
}
