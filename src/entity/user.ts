import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Annotation } from './annotation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(type => Annotation, annotation => annotation.user)
  annotations: Annotation[];

  @CreateDateColumn()
  creat_at: Date;
}
