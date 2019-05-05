import { Post } from '@/shared/base/post.entity';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { ChildEntity, Column } from 'typeorm';
import { ArticleFormatEnum, ArticleStatusEnum } from './article.interface';

registerEnumType(ArticleStatusEnum, {
  name: 'ArticleStatus',
});

registerEnumType(ArticleFormatEnum, {
  name: 'ArticleFormat',
});

@ObjectType()
@ChildEntity()
export class Article extends Post {
  @Field(() => ArticleStatusEnum)
  @Column({
    type: 'enum',
    enum: ArticleStatusEnum,
    default: ArticleStatusEnum.Draft,
  })
  status: ArticleStatusEnum;

  // TODO: jsplayground link image dynamic todo
  // TODO: repost 转发 annotation 书摘 投票
  @Field()
  @Column({ length: 120, nullable: true })
  title: string;

  @Field({ description: '摘要' })
  @Column({ length: 140, default: '' })
  abstract: string;

  @Field()
  @Column({ default: '' })
  cover: string;

  @Field(() => ArticleFormatEnum)
  @Column({
    type: 'enum',
    enum: ArticleFormatEnum,
    default: ArticleFormatEnum.Markdown,
  })
  format: ArticleFormatEnum;
}
