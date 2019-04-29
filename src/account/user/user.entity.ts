import { createHmac } from 'crypto';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';

class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return createHmac('sha256', value).digest('hex');
  }
  from(value: string) {
    return value;
  }
}

@ObjectType()
@Entity({
  name: 'user',
})
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 30, unique: true })
  nickname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: '' })
  // TODO: generated avatar
  avatar: string;

  @Column({
    select: false,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @Field()
  @CreateDateColumn()
  createTime: Date;
}
