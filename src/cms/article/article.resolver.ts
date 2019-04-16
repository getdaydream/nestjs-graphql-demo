import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '@/shared/guards';
import { UserDecorator } from '@/shared/decorators';
import { User } from '@/account/user';

import { CreateArticleInput } from './dto/create-article.input';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { IDArgs } from '@/shared/args';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => Article, { nullable: true })
  async article(@Args() { id }: IDArgs) {
    return await this.articleService.findOne({ id });
  }

  @Mutation(() => Article)
  @UseGuards(GqlAuthGuard)
  async createArticle(
    @UserDecorator() user: User,
    @Args('createArticleInput') input: CreateArticleInput,
  ) {
    return await this.articleService.save({ userId: user.id, ...input });
  }
}
