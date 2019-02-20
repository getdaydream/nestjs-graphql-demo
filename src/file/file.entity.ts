import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Post } from '../post';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  filename: string;

  @Column({ length: 50 })
  filetype: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Post, post => post.files)
  post: Post;

  @Column()
  post_id: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
