import { ChildEntity, Column } from 'typeorm';
import { Post } from '@/cms/post';
import { ObjectType, Field } from 'type-graphql';

@ChildEntity()
@ObjectType()
export class Article extends Post {
  @Field({ description: '摘要' })
  @Column({ length: 140 })
  abstract: string;

  @Column()
  @Field()
  cover: string;

  @Column()
  @Field()
  // TODO: enum: markdown html string
  contentFormat: string;
}
