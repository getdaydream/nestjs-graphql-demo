import { AuthService } from '@/account/auth/auth.service';
import { ArticleService } from '@/cms/article';
import { Article } from '@/cms/article';
import { IDArgs } from '@/shared/args';
import { UserDecorator } from '@/shared/decorators';
import { GqlAuthGuard } from '@/shared/guards';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveProperty,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { FieldResolver } from 'type-graphql';
import { CreateUserInput } from './dto/create-user.input';
import { LoginArgs } from './dto/login.args';
import { LoginResult } from './dto/login.output';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly articleService: ArticleService,
  ) {}

  @Query(() => LoginResult)
  async login(@Args() args: LoginArgs) {
    const { email, password } = args;

    const user = await this.userService.getOneByEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new AuthenticationError('Wrong email or password');
    }
    return {
      user,
      token: this.authService.createToken({ email }),
    };
  }

  @Query(() => User, { name: 'me', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getMe(@UserDecorator() user: User) {
    if (!user) {
      return null;
    }

    const { email } = user;
    return await this.userService.findOne({ email });
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@Args() { id }: IDArgs) {
    return await this.userService.get(id);
  }

  @Mutation(() => LoginResult)
  async createUser(@Args('createUserInput') input: CreateUserInput) {
    const user = await this.userService.create(input);
    return {
      user,
      token: this.authService.createToken({ email: input.email }),
    };
  }

  @ResolveProperty()
  @FieldResolver(() => [Article])
  async articles(@Root() author: User) {
    const { id } = author;
    return await this.articleService.find({ userId: id });
  }
}
