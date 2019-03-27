import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserFollowers {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  followerId: number;
}
