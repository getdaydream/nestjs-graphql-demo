import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn() creat_at: Date;
}
