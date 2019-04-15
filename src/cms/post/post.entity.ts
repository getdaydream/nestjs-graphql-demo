import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  TableInheritance,
} from 'typeorm';
import { ID, Field, ObjectType, Int } from 'type-graphql';

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

  @Field(() => Int)
  @Column({ nullable: true })
  userId: number;

  // TODO: jsplayground link image dynamic todo
  // TODO: repost 转发 annotation 书摘
  @Field()
  @Column({ length: 120, nullable: true })
  title: string;

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
