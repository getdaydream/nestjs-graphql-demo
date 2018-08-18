import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Max, Min } from 'class-validator';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  category: string;

  @Column()
  target_id: string;

  @Column()
  status: 'todo' | 'doing' | 'done';

  @Column()
  comment: string = '';

  @Column({
    type: 'int',
    default: 0,
  })
  @Max(10)
  @Min(0)
  rating_value: number;

  @UpdateDateColumn()
  // 操作的时间
  update_at: Date;

  @CreateDateColumn()
  creat_at: Date;
}
