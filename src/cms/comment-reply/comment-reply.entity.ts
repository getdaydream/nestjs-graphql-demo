import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentId: number;

  @Column()
  content: string;
}
