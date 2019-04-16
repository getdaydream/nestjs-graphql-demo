import { ChildEntity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Post } from '@/shared/abstract/post.entity';

@ChildEntity()
@ObjectType()
export class Article extends Post {
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
