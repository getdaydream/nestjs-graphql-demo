import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CircleMember {
  @PrimaryColumn()
  circleId: number;

  @PrimaryColumn()
  userId: number;
}
