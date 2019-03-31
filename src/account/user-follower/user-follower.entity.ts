import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserFollower {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  followerId: number;
}
