import { Entity, Column } from 'typeorm';
import { Post } from './post';

@Entity()
export class Cheatsheet extends Post {
  @Column({ type: 'text' })
  project: string;
}
