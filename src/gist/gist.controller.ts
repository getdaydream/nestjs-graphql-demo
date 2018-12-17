import {
  Controller,
  Post,
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
import { CreateGistDto, FindGistByIdDto, UpdateGistDto } from './gist.dto';
import { GistService } from './gist.service';
import { TagService } from '@/tag/tag.service';
import { Gist } from './gist.entity';
import { DeepPartial } from 'typeorm';
import { FileService } from '@/file/file.service';

@Controller('gists')
export class GistController {
  constructor(
    private readonly gistService: GistService,
    private readonly tagService: TagService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard())
  async create(@Body() createGistDto: CreateGistDto, @Req() req: Request) {
    const { user } = req;

    const tags = createGistDto.tagIds
      ? await Promise.all(
          createGistDto.tagIds.map(id => this.tagService.get(id)),
        )
      : [];
    if (tags.some(tag => !tag)) {
      throw new HttpException('Tag do not exist.', HttpStatus.BAD_REQUEST);
    }

    const files = await Promise.all(
      createGistDto.files.map(file => this.fileService.create(file)),
    );

    let gist: DeepPartial<Gist> = {
      user_id: user.id,
      title: createGistDto.title,
      description: createGistDto.description,
      isPrivate: createGistDto.isPrivate,
      fileIds: files.map(f => f.id).join(','),
      tags,
    };
    gist = await this.gistService.create(gist);
    delete gist.fileIds;
    return { ...gist, files };
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findGistById(@Param() params: FindGistByIdDto) {
    const { id } = params;
    const gist = await this.gistService.get(Number(id));
    if (!gist) {
      throw new HttpException('Gist not found.', HttpStatus.NOT_FOUND);
    }
    return gist;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteGistById(@Param() params: FindGistByIdDto, @Req() req: Request) {
    const { id } = params;
    const { user } = req;
    const gist = await this.gistService.get(Number(id));
    if (!gist) {
      throw new HttpException('Gist not found.', HttpStatus.NOT_FOUND);
    }
    // TODO: operatorId  string or number ?
    if (gist.user_id !== Number(user.id)) {
      throw new HttpException(
        'You are not delete this gist',
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      await this.gistService.delete({ id: gist.id });
      return gist;
    } catch (e) {
      return new HttpException(
        'Delete gist failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    const gists = await this.gistService.getMany();
    return gists;
  }

  @Put()
  @UseGuards(AuthGuard())
  async updateGist(@Body() updateGistDto: UpdateGistDto) {
    const gist = await this.gistService.get(updateGistDto.id);
    delete updateGistDto.id;
    const tags = updateGistDto.tagIds
      ? await Promise.all(
          updateGistDto.tagIds.map(id => this.tagService.get(id)),
        )
      : [];
    delete updateGistDto.tagIds;
    Object.assign(gist, updateGistDto, { tags });
    return await this.gistService.update(gist);
  }
}
