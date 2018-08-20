import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag';

@Entity()
// @Unique(['hash', 'size'])
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string = '';

  @Column()
  mime_type: string;

  @Column()
  hash: string;

  @Column({ type: 'int' })
  size: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
