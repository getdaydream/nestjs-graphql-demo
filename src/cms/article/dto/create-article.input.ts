import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @Field()
  @Length(5, 50)
  title: string;

  @Field()
  @Length(10, 140)
  abstract: string;
}
