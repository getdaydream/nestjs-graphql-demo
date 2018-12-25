import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRespository: Repository<Folder>,
  ) {}

  async save(folder: Partial<Folder>) {
    return await this.folderRespository.save(folder);
  }

  async getOne(conditions: Partial<Folder>) {
    return await this.folderRespository.findOne(conditions);
  }

  async delete(conditions: Partial<Folder>) {
    return await this.folderRespository.delete(conditions);
  }
}
