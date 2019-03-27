import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserFollowing {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  followingId: number;
}
