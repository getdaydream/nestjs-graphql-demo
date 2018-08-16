import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './post';
import { Tag } from './tag';

@Entity()
export class Article extends Post {
  @Column({ readonly: true })
  category: string = 'default';

  @Column({ readonly: true })
  resource_id: number = 0;

  @Column()
  title: string;

  // 摘要
  // @Column({length: 144})
  // abstract: string;

  @Column({type: 'text'})
  content: string;

  @Column()
  published: boolean = false;

  // this will generate article_tags_tag table
  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
