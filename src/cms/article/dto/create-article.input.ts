import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  @Length(5, 50)
  title: string;

  @Field()
  @Length(10, 140)
  abstract: string;
}
