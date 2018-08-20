import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Annotation } from './annotation';

export enum BOOK_SOURCE {
  DOUBAN,
}

@Entity()
export class Book {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'int' })
  source: number = BOOK_SOURCE.DOUBAN;

  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column()
  subtitle: string;

  @Column()
  year: number;

  @Column()
  pubdate: string;

  @Column()
  cover: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating_value: number;

  @Column()
  rating_count: number;

  @Column()
  rating_on_weight: string;

  @OneToMany(type => Annotation, annotation => annotation.book)
  annotations: Annotation[];

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  create_at: Date;
}
