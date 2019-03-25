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
  @Column({ length: 100, unique: true })
  email: string;

  @Column({
    length: 255,
    select: false,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  creat_at: Date;
}
