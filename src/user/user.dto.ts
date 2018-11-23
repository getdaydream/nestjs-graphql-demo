import { IsEmail, IsNumberString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @Length(8, 20)
  readonly password: string;
  @Length(6, 30)
  readonly name: string;
}

export class UserLoginDto {
  @IsEmail()
  readonly email: string;
  @Length(8, 20)
  readonly password: string;
}

export class FindUserByIdDto {
  @IsNumberString()
  readonly id: number;
}
