import { InjectRepository } from '@nestjs/typeorm';
import { Gist } from './gist.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GistService {
  constructor(
    @InjectRepository(Gist) private readonly gistRespository: Repository<Gist>,
  ) {}

  async get(id: number) {
    return await this.gistRespository
      .createQueryBuilder('gist')
      .where('gist.id = :id', { id })
      .leftJoinAndSelect('gist.tags', 'tags')
      .getOne();
  }

  async create(gist: DeepPartial<Gist>) {
    return await this.gistRespository.save(gist);
  }

  async update(gist: Gist) {
    return await this.gistRespository.save(gist);
  }
}
