import {
  IsNumberString,
  IsOptional,
  IsNumber,
  IsIn,
  IsInt,
  Min,
  MaxLength,
  IsString,
} from 'class-validator';
import { PostType } from './post.interface';
import { Filetype } from '../file';

// class PostFile {
//   @MinLength(1)
//   @MaxLength(100)
//   filename: string;

//   @MinLength(1)
//   @MaxLength(50)
//   filetype: string;

//   @IsString()
//   content: string;
// }

export class CreatePostDto {
  @IsIn(Object.keys(PostType))
  type: PostType;

  @IsInt()
  @Min(0)
  folderId: number;
}

export class EntityIdDto {
  @IsNumberString()
  id: string;
}

export class UpdatePostDto {
  files: any[];

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];

  language: string;
}

export enum QueryPostMethod {
  listRecent = 'listRecent',
  listPostByFolderId = 'listPostByFolderId',
}

export class QueryPostDto {
  @IsIn(Object.keys(QueryPostMethod))
  method: QueryPostMethod;

  @IsOptional()
  @IsNumberString()
  folderId: number;
}

export class DeletePostFileParams {
  @IsNumberString()
  postId: string;

  @IsNumberString()
  fileId: string;
}

export class UpdatePostFileParams {
  @IsNumberString()
  postId: string;

  @IsNumberString()
  fileId: string;
}

export class UpdatePostFileDto {
  @IsOptional()
  @MaxLength(100)
  filename: string;

  @IsOptional()
  @IsIn(Object.keys(Filetype))
  filetype: string;

  @IsOptional()
  @IsString()
  content: string;
}
