import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post';

@Entity()
export class CheatSheet  extends Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;
}
