import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './post';
import { Tag } from './tag';

@Entity()
export class Article extends Post {
  @Column({ readonly: true })
  category: string = 'default';

  @Column({ readonly: true })
  resourceId: number = 0;

  @Column()
  title: string;

  @Column({type: 'text'})
  content: string;

  @Column()
  published: boolean = false;

  // this will generate article_tags table
  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
