import { User } from '@/account/user';
import { IDArgs } from '@/shared/args';
import { UserDecorator } from '@/shared/decorators';
import { GqlAuthGuard } from '@/shared/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';

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
