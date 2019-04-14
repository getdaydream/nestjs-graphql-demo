import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '@/shared/guards';
import { UserDecorator } from '@/shared/decorators';
import { PostService } from '@/cms/post';
import { createPostBaseResolver } from '@/cms/post';
import { User } from '@/account/user';

import { CreateArticleInput } from './dto/create-article.input';
import { Article } from './article.entity';

export const ArticleBaseResolver = createPostBaseResolver('article', Article);

@Resolver(() => Article)
export class ArticleResolver extends ArticleBaseResolver {
  constructor(private readonly postServie: PostService) {
    super(postServie);
  }

  @Mutation(() => Article)
  @UseGuards(GqlAuthGuard)
  async createArticle(
    @UserDecorator() user: User,
    @Args('createArticleInput') input: CreateArticleInput,
  ) {
    return await this.postServie.save({ userId: user.id, ...input });
  }
}
