import { Entity, Column } from 'typeorm';
import { Post } from './post';

@Entity()
export class CheatSheet extends Post {
  @Column()
  language: string;
}
