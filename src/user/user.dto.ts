import { IsEmail, IsNumberString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  readonly password: string;
  readonly name: string;
}

export class UserLoginDto {
  readonly email: string;
  readonly password: string;
}

export class FindUserByIdDto {
  @IsNumberString()
  readonly id: number;
}
