import { CMSModule } from '@/cms';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CMSModule],
  providers: [UserService, UserResolver],
  exports: [UserResolver],
})
export class UserModule {}
