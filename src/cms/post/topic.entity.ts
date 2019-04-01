import { ChildEntity } from 'typeorm';
import { Post } from './post.entity';

@ChildEntity()
export class Topic extends Post {}
