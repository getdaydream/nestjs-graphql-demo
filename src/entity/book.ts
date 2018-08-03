import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export enum BOOK_SOURCE {
  DOUBAN,
}

@Entity()
export class Book {
  @PrimaryColumn() id: string;

  @Column({ type: 'int' })
  source: number = BOOK_SOURCE.DOUBAN;

  @Column() title: string;

  @Column() originalTitle: string;

  @Column() subtitle: string;

  @Column() year: number;

  @Column() pubdate: string;

  @Column() cover: string;

  @Column() ratingValue: number;

  @Column() ratingCount: number;

  @Column() ratingOnWeight: string;

  @UpdateDateColumn() update_at: Date;

  @CreateDateColumn() create_at: Date;
}
