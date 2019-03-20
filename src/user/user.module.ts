import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolvers';
import { UsersController } from './user.controller';

// TODO: schema first or code first ?
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserService, UserResolver],
  exports: [UserResolver],
})
export class UserModule {}
