import {
  FindConditions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SaveOptions,
} from 'typeorm';

export class BaseService<Entity extends ObjectLiteral> {
  repo: Repository<Entity>;

  constructor(repo: Repository<Entity>) {
    this.repo = repo;
  }

  async findOne(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ) {
    return await this.repo.findOne(conditions, options);
  }

  async find(conditions?: FindConditions<Entity>) {
    return await this.repo.find(conditions);
  }

  async save(entity: Partial<Entity>, options?: SaveOptions) {
    return await this.repo.save(entity);
  }
}
