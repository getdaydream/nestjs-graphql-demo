import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { GithubProfileModule } from './github-profile/github-profile.module';
import { UserModule } from './user';

@Module({
  imports: [UserModule, AuthModule, GithubProfileModule],
})
export class AccountModule {}
