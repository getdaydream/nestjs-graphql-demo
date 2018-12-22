import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@/tag/tag.module';
import { FileModule } from '@/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), TagModule, FileModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
