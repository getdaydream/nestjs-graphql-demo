import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateFolderDto, ModifyFolderDto, EntityIdDto } from './folder.dto';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getFolders(@Req() req: Request) {
    const { user } = req;
    const folders = await this.folderService.getMany({ user_id: user.id });
    return folders;
  }

  @Get('/:id/posts')
  @UseGuards(AuthGuard())
  async getPostsUnderFolder(@Param() params: EntityIdDto, @Req() req: Request) {
    const { user } = req;
    if (
      !(await this.folderService.getOne({
        id: Number(params.id),
        user_id: user.id,
      }))
    ) {
      throw new HttpException('Folder not exist', HttpStatus.BAD_REQUEST);
    }
    return {};
    // return this.postService.getMany({
    //   user_id: user.id,
    //   folder_id: Number(params.id),
    // });
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async createFolder(@Body() params: CreateFolderDto, @Req() req: Request) {
    const { user } = req;
    if (params.parentId) {
      const parentFolder = await this.folderService.getOne({
        id: params.parentId,
        user_id: user.id,
      });
      if (!parentFolder) {
        throw new HttpException(
          'Parent folder not exist.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const folder = {
      user_id: user.id,
      name: params.name.trim(),
      parent_id: params.parentId,
    };
    if (await this.folderService.getOne(folder)) {
      throw new HttpException('Duplicate folder', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.folderService.save(folder);
    } catch (e) {
      return new HttpException(
        'Create folder failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  @UseGuards(AuthGuard())
  async modify(@Body() modifyFolderDto: ModifyFolderDto, @Req() req: Request) {
    const { user } = req;
    const folder = await this.folderService.getOne({
      id: modifyFolderDto.id,
      user_id: user.id,
    });
    if (!folder) {
      throw new HttpException('Folder not exist.', HttpStatus.BAD_REQUEST);
    }
    // TODO:
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param() params: EntityIdDto, @Req() req: Request) {
    const { id } = params;
    const { user } = req;
    const folder = await this.folderService.getOne({
      id: Number(id),
      user_id: user.id,
    });
    if (!folder) {
      throw new HttpException('Folder not found.', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.folderService.delete({ id: folder.id });
      return folder;
    } catch (e) {
      return new HttpException(
        'Delete folder failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
