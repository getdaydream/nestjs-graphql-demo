import {
  IsNumberString,
  IsOptional,
  IsNumber,
  ValidateNested,
  MinLength,
  MaxLength,
  IsString,
  IsBoolean,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class GistFile {
  @MinLength(1)
  @MaxLength(100)
  filename: string;

  @MinLength(1)
  @MaxLength(50)
  filetype: string;

  @IsString()
  content: string;
}

export class CreateGistDto {
  @MinLength(1)
  @MaxLength(140)
  title: string;

  @IsString()
  description: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => GistFile)
  files: GistFile[];

  @IsBoolean()
  isPrivate: boolean;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];
}

export class FindGistByIdDto {
  @IsNumberString()
  id: string;
}

export class UpdateGistDto {
  @IsNumber()
  id: number;

  files: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];

  language: string;
}

export class QueryGistDto {
  tags: string;
}
