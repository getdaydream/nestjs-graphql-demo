import {
  Controller,
  Post as PostDecorator,
  Req,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  HttpCode,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePostDto, FindPostByIdDto, UpdatePostDto } from './post.dto';
import { PostService } from './post.service';
import { TagService } from '@/tag/tag.service';
import { Post } from './post.entity';
import { DeepPartial } from 'typeorm';
import { FileService } from '@/file/file.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
    private readonly fileService: FileService,
  ) {}

  @PostDecorator()
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const { user } = req;

    const tags = createPostDto.tagIds
      ? await Promise.all(
          createPostDto.tagIds.map(id => this.tagService.get(id)),
        )
      : [];
    if (tags.some(tag => !tag)) {
      throw new HttpException('Tag do not exist.', HttpStatus.BAD_REQUEST);
    }

    const files = await Promise.all(
      createPostDto.files.map(file => this.fileService.create(file)),
    );

    let post: DeepPartial<Post> = {
      user_id: user.id,
      type: createPostDto.type,
      folder_id: createPostDto.folderId,
      title: createPostDto.title,
      description: createPostDto.description,
      is_private: createPostDto.isPrivate,
      file_ids: files.map(f => f.id).join(','),
      tags,
    };
    post = await this.postService.create(post);
    delete post.file_ids;
    return { ...post, files };
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findPostById(@Param() params: FindPostByIdDto) {
    const { id } = params;
    const post = await this.postService.get(Number(id));
    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deletePostById(@Param() params: FindPostByIdDto, @Req() req: Request) {
    const { id } = params;
    const { user } = req;
    const post = await this.postService.getOne({
      id: Number(id),
      user_id: user.id,
    });
    if (!post) {
      throw new HttpException('Post not exist.', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.postService.delete({ id: post.id });
      return post;
    } catch (e) {
      return new HttpException(
        'Delete post failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * TODO: method: listRecent | listPostByParentId
   * offset limit
   * http response link
   * https://developer.github.com/v3/gists/
   */
  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    const posts = await this.postService.getMany();
    return posts;
  }

  @Put()
  @UseGuards(AuthGuard())
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    const post = await this.postService.get(updatePostDto.id);
    delete updatePostDto.id;
    const tags = updatePostDto.tagIds
      ? await Promise.all(
          updatePostDto.tagIds.map(id => this.tagService.get(id)),
        )
      : [];
    delete updatePostDto.tagIds;
    Object.assign(post, updatePostDto, { tags });
    return await this.postService.update(post);
  }
}
