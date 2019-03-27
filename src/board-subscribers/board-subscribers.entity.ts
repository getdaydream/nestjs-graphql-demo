import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BoardSubscribers {
  @PrimaryColumn()
  boardId: number;

  @PrimaryColumn()
  userId: number;
}
