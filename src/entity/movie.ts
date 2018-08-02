import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

export enum MOVIE_SOURCE {
  DOUBAN,
  IMDB,
}

@Entity()
export class Movie {
  @PrimaryColumn('int') source: number;

  @PrimaryColumn() id: string;

  @Column() title: string;

  @Column() originalTitle: string;

  @Column() year: number;

  @Column() cover: string;

  @Column() ratingValue: number;

  @Column() ratingCount: number;

  @Column() ratingOnWeight: string;

  @UpdateDateColumn() update_at: Date;

  @CreateDateColumn() create_at: Date;
}
