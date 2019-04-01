import { ChildEntity, Column } from 'typeorm';
import { Post } from './post.entity';

@ChildEntity()
export class Article extends Post {
  @Column()
  cover: string;

  @Column()
  isMarkdown: boolean;
}
