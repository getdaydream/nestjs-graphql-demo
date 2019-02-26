import {
  IsNumberString,
  IsOptional,
  IsNumber,
  IsIn,
  IsInt,
  Min,
} from 'class-validator';
import { PostType } from './post.interface';

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

export class CreatePostFileDto {
  @IsInt()
  postId: number;

  @IsIn(Object.keys(PostType))
  type: PostType;
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
