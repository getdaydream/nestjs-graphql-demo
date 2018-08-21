import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag';
import { User } from './user';

@Entity()
// @Unique(['hash', 'size'])
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string = 'default';

  @Column()
  resource_id: number = 0;

  // 七牛云文件名
  @Column()
  key: string;

  @Column()
  title: string;

  @Column()
  description: string = '';

  @Column()
  mime_type: string;

  @Column()
  hash: string;

  @Column({ type: 'int' })
  size: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @ManyToOne(type => User, user => user.images)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  create_at: Date;
}
