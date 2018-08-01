import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './post';
import { Tag } from './tag';

export  class Article extends Post {
@Entity()
  @Column()
  published: boolean = false;

  // this will generate article_tags table
  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
