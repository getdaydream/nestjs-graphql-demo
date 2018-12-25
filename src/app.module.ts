import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config';
import { FolderModule } from './folder';
import { TagModule } from './tag';
import { PostModule } from './post';
import { UserModule } from './user';
import { AuthModule } from './auth';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: ['src/**/**.entity{.ts,.js}'],
      charset: 'utf8mb4',
      synchronize: true,
    }),
    FolderModule,
    TagModule,
    PostModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
