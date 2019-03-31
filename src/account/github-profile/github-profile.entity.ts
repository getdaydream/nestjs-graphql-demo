import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class GithubProfile {
  @PrimaryColumn()
  userIdd: number;

  @Column()
  login: string;

  @Column()
  avatarUrl: string;

  @Column()
  publicRepos: number;

  @Column()
  publicGists: number;

  @Column({ comment: 'Create time of Github account' })
  createTime: string;

  @Column({ comment: 'Update time of Github account' })
  updatedTime: string;
}
