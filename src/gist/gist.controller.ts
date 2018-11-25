import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateGistDto, FindGistByIdDto } from './gist.dto';
import { GistService } from './gist.service';

@Controller('gists')
export class GistController {
  constructor(private readonly gistService: GistService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createGistDto: CreateGistDto, @Req() req: Request) {
    const { user } = req;
    const gist = await this.gistService.create({
      ...createGistDto,
      user_id: user.id,
    });
    return gist;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findGistById(@Param() params: FindGistByIdDto) {
    const { id } = params;
    return await this.gistService.get(id);
  }

  @Put()
  @UseGuards(AuthGuard())
  async updateGist() {
    //
  }
}
