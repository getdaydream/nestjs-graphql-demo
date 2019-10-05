import { IsEnum, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ArticleFormatEnum } from '../article.interface';

@InputType()
export class CreateArticleInput {
  @Field({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  content: string;

  @Field()
  @IsEnum(ArticleFormatEnum)
  format: ArticleFormatEnum;
}
