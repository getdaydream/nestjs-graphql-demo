import { ClassType } from 'type-graphql';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { GqlAuthGuard } from '@/shared/guards';

export const createPostBaseResolver = <T extends ClassType>(
  suffix: string,
  objectTypeCls: T,
) => {
  @Resolver(() => objectTypeCls, { isAbstract: true })
  abstract class PostBaseResolver {
    constructor(private readonly postService: PostService) {}

    @Query(() => objectTypeCls, { name: `${suffix}` })
    @UseGuards(GqlAuthGuard)
    async getPostById(@Args('id') id: number) {
      return await this.postService.get(id);
    }
  }

  // Be aware that with some tsconfig.json settings (like declarations: true),
  // we might receive a [ts] Return type of exported function has or is using private name 'BaseResolver' error,
  // in this case we might need to use any as the return type or create a separate class/interface describing the class methods and properties.
  return PostBaseResolver as any;
};
