import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
