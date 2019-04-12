import { createPostBaseResolver } from '@/cms/post';
import { Article } from './article.entity';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserDecorator } from '@/shared/decorators';
import { User } from '@/account/user';
import { CreateArticleInput } from './dto/create-article.input';
import { PostService } from '@/cms/post';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/shared/guards';

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
