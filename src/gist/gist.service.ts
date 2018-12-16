import { InjectRepository } from '@nestjs/typeorm';
import { Gist } from './gist.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { File } from '@/file/file.entity';

@Injectable()
export class GistService {
  constructor(
    @InjectRepository(Gist) private readonly gistRespository: Repository<Gist>,
  ) {}

  async get(id: number) {
    return await this.gistRespository
      .createQueryBuilder('gist')
      .select([
        'gist.id',
        'gist.title',
        'gist.description',
        'gist.isPrivate',
        'gist.creat_at',
        'gist.update_at',
      ])
      .where('gist.id = :id', { id })
      .leftJoinAndMapOne(
        'gist.files',
        File,
        'file',
        'file.id IN (gist.fileIds)',
      )
      .leftJoinAndSelect('gist.tags', 'tags')
      .getOne();
  }

  async getMany() {
    return await this.gistRespository
      .createQueryBuilder('gist')
      .select([
        'gist.id',
        'gist.title',
        'gist.description',
        'gist.isPrivate',
        'gist.creat_at',
        'gist.update_at',
      ])
      .where({})
      .leftJoinAndMapOne(
        'gist.files',
        File,
        'file',
        'file.id IN (gist.fileIds)',
      )
      .leftJoinAndSelect('gist.tags', 'tags')
      .getMany();
  }

  async create(gist: DeepPartial<Gist>) {
    return await this.gistRespository.save(gist);
  }

  async update(gist: Gist) {
    return await this.gistRespository.save(gist);
  }
}
