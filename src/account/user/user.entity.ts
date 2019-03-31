import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { createHmac } from 'crypto';
import { ObjectType, Field, ID } from 'type-graphql';

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
  creatTime: Date;
}
