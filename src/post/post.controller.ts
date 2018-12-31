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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  CreatePostDto,
  FindPostByIdDto,
  UpdatePostDto,
  QueryPostDto,
  QueryPostMethod,
} from './post.dto';
import { PostService } from './post.service';
import { TagService } from '@/tag/tag.service';
import { Post } from './post.entity';
import { DeepPartial } from 'typeorm';
import { FolderService } from '@/folder/folder.service';
import { FileService } from '@/file/file.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
    private readonly fileService: FileService,
    private readonly folderService: FolderService,
  ) {}

  @PostDecorator()
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const { user } = req;

    if (
      createPostDto.folderId &&
      !(await this.folderService.getOne({ id: createPostDto.folderId }))
    ) {
      throw new HttpException('Folder not exist.', HttpStatus.BAD_REQUEST);
    }

    const defaultFile = await this.fileService.createDefaultFileForPost(
      createPostDto.type,
    );

    let post: DeepPartial<Post> = {
      user_id: user.id,
      type: createPostDto.type,
      folder_id: createPostDto.folderId,
      title: new Date().toLocaleDateString(),
      description: '',
      is_private: true,
      files: [defaultFile],
    };
    post = await this.postService.createNew(post);
    delete post.file_ids;
    return { ...post };
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
  async queryPost(@Query() params: QueryPostDto, @Req() req: Request) {
    const { user } = req;
    if (params.method === QueryPostMethod.listPostByFolderId) {
      if (params.folderId !== undefined) {
        return await this.postService.getMany({
          user_id: user.id,
          folder_id: params.folderId,
        });
      }
    }
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
