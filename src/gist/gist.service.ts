import { InjectRepository } from '@nestjs/typeorm';
import { Gist } from './gist.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GistService {
  constructor(
    @InjectRepository(Gist) private readonly gistRespository: Repository<Gist>,
  ) {}

  async get(id: number) {
    return await this.gistRespository.findOne(id);
  }

  async create(gist) {
    return await this.gistRespository.save(this.gistRespository.create(gist));
  }
}
