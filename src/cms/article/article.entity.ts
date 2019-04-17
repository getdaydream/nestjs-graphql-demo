import { Post } from '@/shared/base/post.entity';
import { Field, ObjectType } from 'type-graphql';
import { ChildEntity, Column } from 'typeorm';

@ObjectType()
@ChildEntity()
export class Article extends Post {
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
