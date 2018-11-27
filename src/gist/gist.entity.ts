import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from 'src/tag/tag.entity';

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
  language: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  creat_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
