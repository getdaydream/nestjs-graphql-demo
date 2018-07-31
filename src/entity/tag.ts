import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  count: number;

  @CreateDateColumn()
  creat_at: Date;
}
