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
  EntityIdDto,
  UpdatePostDto,
  QueryPostDto,
  QueryPostMethod,
  CreatePostFileDto,
} from './post.dto';
import { PostService } from './post.service';
// import { TagService } from '../tag';
import { Post } from './post.entity';
import { DeepPartial } from 'typeorm';
import { FolderService } from '../folder/folder.service';
import { FileService } from '../file/file.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    // private readonly tagService: TagService,
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
      title: new Date().toLocaleString(),
      description: '',
      is_private: true,
      file_ids: String(defaultFile.id),
    };
    post = await this.postService.save(post);
    delete post.file_ids;
    return { ...post, files: [defaultFile] };
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deletePostById(@Param() params: EntityIdDto, @Req() req: Request) {
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
      throw new HttpException(
        'Delete post failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findPostById(@Param() params: EntityIdDto) {
    const { id } = params;
    const post = await this.postService.get({ id: Number(id) });
    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);
    }
    return post;
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

  @Put(':id')
  @UseGuards(AuthGuard())
  async updatePost(
    @Param() params: EntityIdDto,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    const { user } = req;
    const post = await this.postService.get({
      id: Number(params.id),
      user_id: user.id,
    });

    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.BAD_REQUEST);
    }

    Object.assign(post, updatePostDto);
    const newPost = await this.postService.save(post);
    return { ...newPost };
  }

  @Get('/:id/files')
  @UseGuards(AuthGuard())
  async getPostsFiles(@Param() params: EntityIdDto, @Req() req: Request) {
    const { user } = req;
    const files = this.postService.getPostFiles(Number(params.id), user.id);
    if (!files) {
      throw new HttpException('Files not found.', HttpStatus.BAD_REQUEST);
    }
    return files;
  }

  @PostDecorator('/:id/files')
  @UseGuards(AuthGuard())
  async createPostFile(
    @Param() params: EntityIdDto,
    @Body() createPostFileDto: CreatePostFileDto,
    @Req() req: Request,
  ) {
    const { user } = req;
    const post = await this.postService.get({
      id: Number(params.id),
      user_id: user.id,
    });
    if (!post) {
      throw new HttpException('Post not found.', HttpStatus.BAD_REQUEST);
    }

    const defaultFile = await this.fileService.createDefaultFileForPost(
      createPostFileDto.type,
    );
    const newPost = await this.postService.save({
      ...post,
      file_ids: `${post.file_ids},${defaultFile.id}`,
    });
    delete newPost.file_ids;
    return { ...post, files: [...(post as any).files, defaultFile] };
  }
}
