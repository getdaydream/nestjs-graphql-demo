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
  DeletePostFileParams,
  UpdatePostFileDto,
} from './post.dto';
import { PostService } from './post.service';
// import { TagService } from '../tag';
import { Post } from './post.entity';
import { DeepPartial, getManager } from 'typeorm';
import { FolderService } from '../folder/folder.service';
import { FileService } from '../file/file.service';
import { POST_TYPE_MAP_FILETYPE } from './post.util';
import { PostType } from './post.interface';
import { Filetype } from '../file/file.interface';
import { File } from '../file';

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

    const defaultFile = await this.fileService.saveDefaultFileForPost(
      POST_TYPE_MAP_FILETYPE[createPostDto.type],
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
  async createPostFile(@Param() params: EntityIdDto, @Req() req: Request) {
    const { user } = req;
    const post = await this.postService.get({
      id: Number(params.id),
      user_id: user.id,
    });
    if (!post || post.type !== PostType.snippet) {
      throw new HttpException('Post not found.', HttpStatus.BAD_REQUEST);
    }

    const newFile = await getManager().transaction(async mgr => {
      const defaultFile = await mgr.save(
        this.fileService.createDefaultFileForPost(Filetype.typescript),
      );
      await mgr.save(
        mgr.create(Post, {
          id: post.id,
          file_ids: `${post.files.map(f => f.id).join(',')},${defaultFile.id}`,
        }),
      );
      return defaultFile;
    });

    return newFile;
  }

  @Delete('/:postId/files/:fileId')
  @UseGuards(AuthGuard())
  async deletePostFile(
    @Param() params: DeletePostFileParams,
    @Req() req: Request,
  ) {
    const { user } = req;
    const { postId, fileId } = params;
    const post = await this.postService.getOne({
      id: Number(postId),
      user_id: user.id,
    });
    const file = await this.fileService.get(Number(fileId));
    if (
      !post ||
      post.type !== PostType.snippet ||
      !post.file_ids.split(',').includes(fileId) ||
      !file
    ) {
      throw new HttpException(
        'Post not found or wrong data.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newFileIds = post.file_ids
      .split(',')
      .filter(id => id !== fileId)
      .join(',');
    post.file_ids = newFileIds;

    try {
      await getManager().transaction(async mgr => {
        await mgr.delete(File, { id: Number(fileId) });
        await mgr.save(post);
      });
      return { error: null };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:postId/files/:fileId')
  @UseGuards(AuthGuard())
  async updatePostFile(
    @Param() params: DeletePostFileParams,
    @Body() body: UpdatePostFileDto,
    @Req() req: Request,
  ) {
    const { user } = req;
    const { postId, fileId } = params;
    const post = await this.postService.getOne({
      id: Number(postId),
      user_id: user.id,
    });
    const file = await this.fileService.get(Number(fileId));
    if (!post || !post.file_ids.split(',').includes(fileId) || !file) {
      throw new HttpException(
        'Post not found or wrong data.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      post.type === PostType.markdown &&
      body.filetype &&
      body.filetype !== Filetype.markdown
    ) {
      throw new HttpException(
        `Can't change markdown filetype for markdown.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedFile = await this.fileService.save({
      id: Number(fileId),
      ...body,
    });
    return updatedFile;
  }
}
