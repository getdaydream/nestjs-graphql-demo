import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/shared/guards';
import { UserDecorator } from '@/shared/decorators';
import { User } from './user.entity';
import { AuthenticationError } from 'apollo-server-core';
import { AuthService } from '@/account/auth/auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginArgs } from './dto/login.args';
import { LoginResult } from './dto/login.output';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async getMe(@UserDecorator() user: User) {
    const { email } = user;
    return await this.userService.getOneByEmail(email);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@Args('id') id: number) {
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
}
