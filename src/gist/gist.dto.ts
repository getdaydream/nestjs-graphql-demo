import { IsNumberString, IsOptional } from 'class-validator';

export class CreateGistDto {
  files: string;
  tags: string;
  language: string;
}

export class FindGistByIdDto {
  @IsNumberString()
  id: number;
}

export class UpdateGistDto {
  files: string;
  tags: string;
  language: string;
}
