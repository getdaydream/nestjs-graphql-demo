import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;
}
