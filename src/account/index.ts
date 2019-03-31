import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { GithubProfileModule } from './github-profile/github-profile.module';

@Module({
  imports: [UserModule, AuthModule, GithubProfileModule],
})
export class AccountModule {}
