import { User } from '@/account/user';
import { IDArgs } from '@/shared/args';
import { UserDecorator } from '@/shared/decorators';
import { GqlAuthGuard } from '@/shared/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-core';
import { Article } from './article.entity';
import { ArticleStatusEnum } from './article.interface';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

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

  @Mutation(() => Article)
  @UseGuards(GqlAuthGuard)
  async updateArticle(
    @UserDecorator() user: User,
    @Args('updateArticleInput') input: UpdateArticleInput,
  ) {
    const article = await this.articleService.findOne({
      id: input.id,
      userId: user.id,
    });

    if (!article) {
      throw new UserInputError(`Can't find the article you request.`);
    }

    if (input.status && article.status === ArticleStatusEnum.Published) {
      throw new UserInputError(
        `Can't publish Article ${article.id} that has been published already.`,
      );
    }

    const { article: newArticle } = await this.articleService.updateArticle(
      article,
      {
        ...input,
      },
    );

    return newArticle;
  }
}
