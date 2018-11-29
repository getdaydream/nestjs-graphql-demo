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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateGistDto, FindGistByIdDto, UpdateGistDto } from './gist.dto';
import { GistService } from './gist.service';
import { TagService } from '@/tag/tag.service';

@Controller('gists')
export class GistController {
  constructor(
    private readonly gistService: GistService,
    private readonly tagService: TagService,
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
    delete createGistDto.tagIds;
    const gist = await this.gistService.create({
      user_id: user.id,
      ...createGistDto,
      tags,
    });
    return gist;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findGistById(@Param() params: FindGistByIdDto) {
    const { id } = params;
    return await this.gistService.get(Number(id));
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
