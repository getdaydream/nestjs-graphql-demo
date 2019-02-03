import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CreateUserDto, UserLoginDto, FindUserByIdDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    delete user.password;
    const token = this.authService.createToken({ email: user.email });
    res.cookie('token', token, {
      expires: new Date(Date.now() + 900000),
    });
    res.status(HttpStatus.CREATED).json(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findUserById(@Param() params: FindUserByIdDto) {
    const { id } = params;
    return await this.userService.get(id);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const user = await this.userService.getOneByEmailAndPassword(
      userLoginDto.email,
      userLoginDto.password,
    );
    if (!user) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.authService.createToken({ email: userLoginDto.email });
    res.cookie('token', token, {
      // maxAge : 10h
      maxAge: 1000 * 60 * 60 * 10,
      httpOnly: false,
    });
    res.status(HttpStatus.OK).json(user);
  }
}
