import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user';

export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.annotations)
  user: User;

  @Column()
  user_id: number;
  // // TODO
  // @Column()
  // Comment;

  @CreateDateColumn()
  creat_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
