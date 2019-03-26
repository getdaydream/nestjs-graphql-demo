import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class GithubProfile {
  @PrimaryColumn()
  user_id: number;

  @Column()
  login: string;

  @Column()
  avatar_url: string;

  @Column()
  public_repos: number;

  @Column()
  public_gists: number;

  @Column({ comment: 'Create time of Github account' })
  created_at: string;

  @Column({ comment: 'Update time of Github account' })
  updated_at: string;
}
