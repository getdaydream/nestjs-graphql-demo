import { Module } from '@nestjs/common';
import { GistController } from './gist.controller';
import { GistService } from './gist.service';
import { Gist } from './gist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@/tag/tag.module';
import { FileModule } from '@/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gist]), TagModule, FileModule],
  controllers: [GistController],
  providers: [GistService],
})
export class GistModule {}
