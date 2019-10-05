import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 30)
  nickname: string;

  @Field()
  @Length(8, 20)
  password: string;
}
