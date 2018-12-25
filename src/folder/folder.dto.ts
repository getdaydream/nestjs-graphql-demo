import { MinLength, MaxLength, IsNumber, Min, Max } from 'class-validator';

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
