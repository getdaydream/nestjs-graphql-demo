import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubProfile } from './github-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GithubProfile])],
})
export class GithubProfileModule {}
