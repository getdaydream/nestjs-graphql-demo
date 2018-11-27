import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() params: CreateTagDto) {
    if (await this.tagService.getByName(params.name)) {
      throw new HttpException('Duplicate tag name.', HttpStatus.BAD_REQUEST);
    }
    return await this.tagService.create(params);
  }
}
