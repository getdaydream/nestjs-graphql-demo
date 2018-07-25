import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // TODO
  @Column()
  Comment;

  @CreateDateColumn()
  creat_at: Date;
}