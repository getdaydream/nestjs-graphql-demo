import {
  Entity,
  Column,
} from 'typeorm';
import { Post } from './post';

@Entity()
export class Annotation extends Post {
  @Column()
  book_id: string;

  @Column()
  content: string;

  @Column()
  comment: string;
}
