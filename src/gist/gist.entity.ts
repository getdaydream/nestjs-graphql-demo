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
export class Gist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 140 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  fileIds: string;

  @Column()
  isPrivate: boolean;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  creat_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
