import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  files: string;

  @Column()
  tags: string;

  @Column()
  language: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  creat_at: Date;
}
