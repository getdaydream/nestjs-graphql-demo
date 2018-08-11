import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './post';
import { Tag } from './tag';

@Entity()
export class Article extends Post {
  @Column()
  title: string;

  @Column()
  published: boolean = false;

  // this will generate article_tags table
  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
