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
import { GraphQLModule } from '@nestjs/graphql';
import { CustomNamingStrategy } from './shared/utils';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: ['src/**/**.entity{.ts,.js}'],
      charset: 'utf8mb4',
      synchronize: true,
      namingStrategy: new CustomNamingStrategy(),
    }),
    GraphQLModule.forRoot({
      // pass express `req` as a part of the context value
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.graphql'],
      // TODO: load env before start app; add types for env
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    TagModule,
    PostModule,
    FolderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
