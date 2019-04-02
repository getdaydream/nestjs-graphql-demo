import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // TODO: jsplayground link image dynamic todo
  // TODO: repost 转发
  @Column({ length: 120 })
  title: string;

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
