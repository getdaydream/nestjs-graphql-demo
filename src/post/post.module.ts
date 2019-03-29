import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { FolderModule } from '../folder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    FileModule,
    FolderModule,
  ],
  controllers: [],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
