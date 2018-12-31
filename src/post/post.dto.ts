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
  @IsIn(['snippet', 'markdown'])
  type: PostType;

  @IsInt()
  @Min(0)
  folderId: number;
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
