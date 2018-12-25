import {
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
  IsNumberString,
} from 'class-validator';

export class CreateFolderDto {
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @IsNumber()
  parentId: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  depth: number;
}

export class ModifyFolderDto {
  @IsNumber()
  id: number;

  @IsNumber()
  parentId: number;

  @MinLength(1)
  @MaxLength(80)
  name: string;
}

export class DeleteFolderDto {
  @IsNumberString()
  id: string;
}
