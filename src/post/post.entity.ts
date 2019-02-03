import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Tag } from '../tag';
import { File } from '../file/file.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    // TODO: jsplayground link image dynamic todo
    enum: ['snippet', 'markdown'],
    readonly: true,
  })
  type: string;

  @Column()
  folder_id: number;

  @Column({ length: 140 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @OneToMany(() => File, file => file.post, { cascade: true })
  @JoinColumn({ name: 'file_ids' })
  files: File[];

  @Column()
  file_ids: string;

  @Column()
  is_private: boolean;

  // TODO: use timestamp
  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  creat_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
