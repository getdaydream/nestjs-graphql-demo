import { IsEnum, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ArticleFormatEnum } from '../article.interface';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsEnum(ArticleFormatEnum)
  format: ArticleFormatEnum;
}
