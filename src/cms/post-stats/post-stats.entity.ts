import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PostStats {
  @Field(() => Int)
  @PrimaryColumn()
  postId: number;

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  voteUpCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  voteDownCount: number;
}
