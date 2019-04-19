import { Equals, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { ArticleStatusEnum } from '../article.interface';

@InputType()
export class UpdateArticleInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @Equals(ArticleStatusEnum.Published)
  status: ArticleStatusEnum.Published;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content: string;
}
