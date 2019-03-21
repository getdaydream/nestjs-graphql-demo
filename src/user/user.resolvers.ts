import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from 'src/graphql.schema';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/shared/decorators';
import { UserEntity } from './user.entity';
import { AuthenticationError } from 'apollo-server-core';
import { AuthService } from 'src/auth/auth.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
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

  @Query('me')
  @UseGuards(GqlAuthGuard)
  async getMe(@User() user: UserEntity) {
    const { email } = user;
    return await this.userService.getOneByEmail(email);
  }

  @Query()
  async user(@Args('id') id: number) {
    return await this.userService.get(id);
  }

  // mutation User {
  //   createUser(createUserInput:{email:"88888888@qq.com", password: "12345678", nickname:"test"}) {
  //     id
  //   }
  // }
  @Mutation()
  async createUser(@Args('createUserInput') args: CreateUserInput) {
    const user = await this.userService.create({
      email: args.email,
      nickname: args.nickname,
      password: args.password,
    });
    return user;
  }
}
