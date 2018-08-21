import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Annotation } from './annotation';
import { Image } from './image';

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

  @OneToMany(type => Image, image => image.user)
  images: Image[];

  @OneToMany(type => Annotation, annotation => annotation.user)
  annotations: Annotation[];

  @CreateDateColumn()
  creat_at: Date;
}
