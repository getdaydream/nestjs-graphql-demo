import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '@/tag/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'enum', enum: ['snippet', 'article'] })
  type: number;

  @Column({ length: 50 })
  folder: string;

  @Column({ length: 140 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  fileIds: string;

  @Column()
  isPrivate: boolean;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  creat_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
