import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserInput } from 'src/graphql.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
    // const token = this.auth.createToken({ email });
    // res.cookie('token', token, {
    //   // maxAge : 10h
    //   maxAge: 1000 * 60 * 60 * 10,
    //   httpOnly: true,
    // });
    // res.status(HttpStatus.OK).json(user);
  }

  @Query('me')
  async getMe(@Req() req: Request) {
    const {
      user: { id },
    } = req;
    return await this.userService.get(id);
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
