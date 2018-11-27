import { IsNumberString, IsOptional, IsNumber } from 'class-validator';

export class CreateGistDto {
  files: string;
  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];
  language: string;
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
