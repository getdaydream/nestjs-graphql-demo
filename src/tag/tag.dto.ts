import { MaxLength } from 'class-validator';

export class CreateTagDto {
  @MaxLength(30)
  name: string;
}
