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
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class PostFile {
  @MinLength(1)
  @MaxLength(100)
  filename: string;

  @MinLength(1)
  @MaxLength(50)
  filetype: string;

  @IsString()
  content: string;
}

export class CreatePostDto {
  @IsIn(['snippet', 'article'])
  type: string;

  @IsNumber()
  folderId: number;

  @MinLength(1)
  @MaxLength(140)
  title: string;

  @IsString()
  description: string;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => PostFile)
  files: PostFile[];

  @IsBoolean()
  isPrivate: boolean;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];
}

export class FindPostByIdDto {
  @IsNumberString()
  id: string;
}

export class UpdatePostDto {
  @IsNumber()
  id: number;

  files: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];

  language: string;
}

export class QueryPostDto {
  tags: string;
}
