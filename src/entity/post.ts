import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

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
