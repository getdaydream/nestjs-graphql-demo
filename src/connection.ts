import { config } from './config/index';
import { createConnection, Connection } from 'typeorm';

export class DatabaseConnection {
  static connection: Connection;

  static async open() {
    this.connection = await createConnection({
      type: 'mysql',
      host: config.mysql.host,
      port: 3306,
      username: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
      entities: [__dirname + '/entity/*.{ts,js}'],
      charset: 'utf8mb4',
      synchronize: true,
    });
  }

  static async close() {
    await this.connection.close();
  }
}
