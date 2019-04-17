import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({
  // prevent TYPE-GRAPHQL generate type schema for Post,
  // for this is abstract class
  isAbstract: true,
})
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '作者ID' })
  @Column({ nullable: true })
  userId: number;

  @Field(() => Int, { description: '访问量(点击数)' })
  @Column({ default: 0 })
  views: number;

  @Field()
  @UpdateDateColumn()
  updateTime: Date;

  @Field()
  @CreateDateColumn()
  creatTime: Date;
}
