import { InputType, Field } from 'type-graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsString()
  @Length(5, 50)
  title: string;

  @Field()
  @IsString()
  @Length(10, 140)
  abstract: string;
}
