import {
  MinLength,
  MaxLength,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateFolderDto {
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  parentId: number;
}

export class ModifyFolderDto {
  @IsNumber()
  id: number;

  @MinLength(1)
  @MaxLength(80)
  name: string;
}

export class DeleteFolderDto {
  @IsNumberString()
  id: string;
}
