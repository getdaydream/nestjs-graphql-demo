import { Module } from '@nestjs/common';
import { GistController } from './gist.controller';
import { GistService } from './gist.service';
import { Gist } from './gist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gist]), TagModule],
  controllers: [GistController],
  providers: [GistService],
})
export class GistModule {}
