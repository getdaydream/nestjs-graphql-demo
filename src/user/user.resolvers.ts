import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserInput } from 'src/graphql.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('me')
  async getMe(@Req() req: Request) {
    const {
      user: { id },
    } = req;
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
