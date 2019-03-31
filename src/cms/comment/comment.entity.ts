import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column({ comment: '评论者id' })
  userId: number;

  @Column()
  content: string;

  @Column()
  // TODO: draft published
  status: string;

  @CreateDateColumn()
  createTime: Date;
}
