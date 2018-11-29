import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository, DeepPartial } from 'typeorm';

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
}
