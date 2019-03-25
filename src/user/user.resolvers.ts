import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { UserDecorator } from 'src/shared/decorators';
import { UserEntity } from './user.entity';
import { AuthenticationError } from 'apollo-server-core';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginArgs } from './dto/login.args';
import { LoginResult } from './dto/login.output';

@Resolver(UserEntity)
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

  @Query(() => UserEntity, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async getMe(@UserDecorator() user: UserEntity) {
    const { email } = user;
    return await this.userService.getOneByEmail(email);
  }

  @Query(() => UserEntity)
  async user(@Args('id') id: number) {
    return await this.userService.get(id);
  }

  // mutation User {
  //   createUser(createUserInput:{email:"88888888@qq.com", password: "12345678", nickname:"test"}) {
  //     id
  //   }
  // }
  @Mutation(() => UserEntity)
  async createUser(@Args('createUserInput') input: CreateUserInput) {
    const user = await this.userService.create(input);
    return user;
  }
}
