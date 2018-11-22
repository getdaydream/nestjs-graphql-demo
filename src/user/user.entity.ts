import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { createHmac } from 'crypto';

class PasswordTransformer implements ValueTransformer {
  to(value) {
    return createHmac('sha256', value).digest('hex');
  }
  from(value) {
    return value;
  }
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
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
