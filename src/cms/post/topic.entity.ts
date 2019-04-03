import { ChildEntity, Column } from 'typeorm';
import { Post } from './post.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@ChildEntity()
export class Topic extends Post {
  @Field()
  @Column()
  description: string;
}
