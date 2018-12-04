import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTagDto, UpdateTagDto } from './tag.dto';
import { TagService } from './tag.service';
import { Request } from 'express';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() params: CreateTagDto) {
    if (await this.tagService.getByName(params.name)) {
      throw new HttpException('Duplicate tag name.', HttpStatus.BAD_REQUEST);
    }
    return await this.tagService.save(params);
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(@Body() params: UpdateTagDto, @Req() req: Request) {
    const { id: user_id } = req.user;
    const { id, name } = params;
    const tag = await this.tagService.getOne({ user_id, id });
    if (!tag) {
      throw new HttpException('tag not exist.', HttpStatus.BAD_REQUEST);
    }
    if (tag.name === name) {
      return tag;
    }
    tag.name = name;
    await this.tagService.save(tag);
    return tag;
  }
}
