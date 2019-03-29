import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CommentReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentId: number;

  @Column()
  content: string;
}
