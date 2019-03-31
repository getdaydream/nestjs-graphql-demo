import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // Send me post reply notifications ?

  @UpdateDateColumn()
  updateTime: Date;

  @CreateDateColumn()
  createTime: Date;
}
