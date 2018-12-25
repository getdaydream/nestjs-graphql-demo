import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateFolderDto } from './folder.dto';

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
    const {
      user: { id: user_id },
    } = req;
    let folder = {
      user_id,
      name: createFolderDto.name,
      parent_id: createFolderDto.parentId,
      depth: createFolderDto.depth,
    };
    if (await this.folderService.getOne(folder)) {
      throw new HttpException('Duplicate folder', HttpStatus.BAD_REQUEST);
    }
    try {
      folder = await this.folderService.create(folder);
      return folder;
    } catch (e) {
      return new HttpException(
        'Create folder failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
