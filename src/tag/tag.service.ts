import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async get(id: number) {
    return await this.tagRepository.findOne(id);
  }

  async getByName(name: string) {
    return await this.tagRepository.findOne({ name });
  }

  async create(tag: DeepPartial<Tag>) {
    return await this.tagRepository.save(tag);
  }
}
