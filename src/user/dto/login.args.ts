import { ArgsType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @IsEmail()
  email: string;

  @Length(8, 20)
  password: string;
}
