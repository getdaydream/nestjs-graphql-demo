import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string = '';

  // hash ?

  @Column()
  url: string;

  @Column({ type: 'int' })
  size: number;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
