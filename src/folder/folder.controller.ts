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
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  CreateFolderDto,
  ModifyFolderDto,
  DeleteFolderDto,
} from './folder.dto';
import { Folder } from '.';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async createFolder(
    @Body() createFolderDto: CreateFolderDto,
    @Req() req: Request,
  ) {
    const { user } = req;
    let folder = {
      user_id: user.id,
      name: createFolderDto.name,
      parent_id: createFolderDto.parentId,
      depth: createFolderDto.depth,
    } as Partial<Folder>;
    if (await this.folderService.getOne(folder)) {
      throw new HttpException('Duplicate folder', HttpStatus.BAD_REQUEST);
    }
    try {
      folder = await this.folderService.save(folder);
      return folder;
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
  async delete(@Param() params: DeleteFolderDto, @Req() req: Request) {
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
