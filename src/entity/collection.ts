import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  category: string;

  @PrimaryColumn()
  targetId: string;

  @Column()
  status: 'todo' | 'doing' | 'done';

  @Column()
  comment: string = '';

  @UpdateDateColumn()
  // 操作的时间
  update_at: Date;

  @CreateDateColumn()
  creat_at: Date;
}
