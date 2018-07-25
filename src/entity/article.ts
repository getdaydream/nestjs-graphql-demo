import { Entity } from 'typeorm';
import { Post } from './post';

@Entity()
export class Article extends Post {
}