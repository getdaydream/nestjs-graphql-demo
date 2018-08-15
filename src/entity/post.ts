import { PrimaryGeneratedColumn, Column, CreateDateColumn, TableForeignKey, UpdateDateColumn } from 'typeorm';

export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  // // TODO
  // @Column()
  // Comment;

  @CreateDateColumn()
  creat_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
