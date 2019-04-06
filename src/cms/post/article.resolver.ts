import { createPostBaseResolver } from './post.base.resolver';
import { Article } from './article.entity';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserDecorator } from 'src/shared/decorators';
import { User } from 'src/account/user';
import { CreateArticleInput } from './dto/create-article.input';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/account/auth/auth.guard';

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
