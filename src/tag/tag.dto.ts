import { MaxLength, MinLength, IsNumber } from 'class-validator';

export class CreateTagDto {
  @MinLength(1)
  @MaxLength(50)
  name: string;
}

export class UpdateTagDto {
  @IsNumber()
  id: number;

  @MinLength(1)
  @MaxLength(50)
  name: string;
}
