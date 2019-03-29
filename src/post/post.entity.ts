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
  user_id: number;

  // TODO: jsplayground link image dynamic todo
  @Column()
  type: string;

  @Column({ length: 120, nullable: true })
  title: string;

  @Column({ length: 140 })
  digest: string;

  @Column({
    default: 0,
    comment: '访问量',
  })
  views: number;

  @Column()
  isPrivate: boolean;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  creatAt: Date;
}
