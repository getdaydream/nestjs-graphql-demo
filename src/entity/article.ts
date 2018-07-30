import { Column, ManyToOne, ManyToMany, JoinTable, Entity } from 'typeorm';
import { Post } from './post';
import { User } from './user';
import { Tag } from './tag';

@Entity()
export  class Article extends Post {
  @Column()
  published: boolean;

  @ManyToOne(type => User, user => user.articles)
  user: User;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
