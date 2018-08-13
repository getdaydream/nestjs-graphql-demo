import { PrimaryGeneratedColumn, Column, CreateDateColumn, TableForeignKey } from 'typeorm';

export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({type: 'text'})
  content: string;

  // // TODO
  // @Column()
  // Comment;

  @CreateDateColumn()
  creat_at: Date;
}
