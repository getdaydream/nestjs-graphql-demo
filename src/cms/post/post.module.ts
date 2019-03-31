import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
