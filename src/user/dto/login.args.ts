import { ArgsType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @IsEmail()
  @Field()
  email: string;

  @Length(8, 20)
  @Field()
  password: string;
}
