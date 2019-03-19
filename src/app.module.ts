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
import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

/**
 * Converts string into snake-case.
 *
 * @see https://regex101.com/r/QeSm2I/1
 */
export function snakeCase(str: string) {
  return str
    .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4')
    .toLowerCase();
}

class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join('_'),
    );
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      tableName + '_' + (columnName ? columnName : propertyName),
    );
  }
}

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
      typePaths: ['./**/*.graphql'],
      // TODO: load env before start app; add types for env
      debug: true,
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    // GraphQLModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     typePaths: configService.getString('GRAPHQL_TYPE_PATHS'),
    //   }),
    //   inject: [ConfigService],
    // })
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
