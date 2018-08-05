import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

export enum MOVIE_SOURCE {
  DOUBAN,
  IMDB,
}

export enum MOVIE_SUBTYPE {
  TV,
  MOVIE,
}

@Entity()
export class Movie {
  @PrimaryColumn() id: string;

  @Column('int') source: MOVIE_SOURCE = MOVIE_SOURCE.DOUBAN;

  @Column() subtype: MOVIE_SUBTYPE;

  @Column() title: string;

  @Column() original_title: string;

  @Column() year: number;

  @Column() cover: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 }) rating_value: number;

  @Column() rating_count: number;

  @Column() rating_on_weight: string;

  @Column({ type: 'text' }) summary: string;

  @UpdateDateColumn() update_at: Date;

  @CreateDateColumn() create_at: Date;
}
