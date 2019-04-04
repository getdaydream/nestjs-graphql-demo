import { Module } from '@nestjs/common';
import { PostModule } from './post';

@Module({
  imports: [PostModule],
})
export class CMSModule {}
