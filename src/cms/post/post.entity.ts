import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // TODO: jsplayground link image dynamic todo
  @Column()
  type: string;

  @Column({ length: 120 })
  title: string;

  @Column()
  cover: string;

  @Column({ length: 140, comment: '摘要', nullable: false })
  abstract: string;

  @Column({
    default: 0,
    comment: '访问量(点击数)',
  })
  views: number;

  @UpdateDateColumn()
  updateTime: Date;

  @CreateDateColumn()
  creatTime: Date;
}
