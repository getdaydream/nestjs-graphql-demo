import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CreateUserDto, UserLoginDto, FindUserByIdDto } from './user.dto';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { name, password, email } = createUserDto;

    if (!name) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.create(createUserDto);
    delete user.password;
    return user;
  }

  @Get(':id')
  async findUserById(@Param() params: FindUserByIdDto) {
    const { id } = params;
    return await this.userService.get(id);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    //
  }
}
