import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CMSModule } from '@/cms';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CMSModule],
  providers: [UserService, UserResolver],
  exports: [UserResolver],
})
export class UserModule {}
