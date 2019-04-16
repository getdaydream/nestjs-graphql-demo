import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async find(conditions: Partial<Article>) {
    return await this.articleRepository.find(conditions);
  }

  async findOne(conditions: Partial<Article>) {
    return await this.articleRepository.findOne(conditions);
  }

  async save(article: Partial<Article>) {
    return await this.articleRepository.save(article);
  }
}
