import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tag';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    // TODO: jsplayground link image dynamic todo
    enum: ['snippet', 'markdown'],
    readonly: true,
  })
  type: string;

  @Column()
  folder_id: number;

  @Column({ length: 140 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  file_ids: string;

  @Column()
  is_private: boolean;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  creat_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
