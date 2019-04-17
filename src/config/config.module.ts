import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

// 全局 module
@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      // TODO: dotenv-expand
      useValue: new ConfigService(`${process.env.NODE_ENV || ''}.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
