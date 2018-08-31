import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.annotations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ select: false })
  user_id: number;
  // // TODO
  // @Column()
  // Comment;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
