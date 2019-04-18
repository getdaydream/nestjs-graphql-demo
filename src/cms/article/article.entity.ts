import { Post } from '@/shared/base/post.entity';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { ChildEntity, Column } from 'typeorm';
import { ArticleStatus } from './article.interface';

registerEnumType(ArticleStatus, {
  name: 'ArticleStatus',
});

@ObjectType()
@ChildEntity()
export class Article extends Post {
  @Field(() => ArticleStatus)
  @Column({ type: 'enum', enum: ArticleStatus, default: ArticleStatus.Draft })
  status: ArticleStatus;

  // TODO: jsplayground link image dynamic todo
  // TODO: repost 转发 annotation 书摘
  @Field()
  @Column({ length: 120, nullable: true })
  title: string;

  @Field({ description: '摘要' })
  @Column({ length: 140 })
  abstract: string;

  @Field()
  @Column({ default: '' })
  cover: string;

  @Field()
  @Column()
  // TODO: enum: markdown html string
  contentFormat: string;
}
