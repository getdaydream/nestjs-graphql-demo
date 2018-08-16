import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Max, Min } from 'class-validator';

@Entity()
export class Collection {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  category: string;

  @PrimaryColumn()
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
