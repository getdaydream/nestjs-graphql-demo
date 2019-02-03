import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '../tag/tag.module';
import { FileModule } from '../file/file.module';
import { FolderModule } from '../folder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TagModule,
    FileModule,
    FolderModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
