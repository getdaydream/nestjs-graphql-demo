import { createConnection } from 'typeorm';
import { config } from './config/index';

createConnection({
    type: 'mysql',
    host: config.mysql.host,
    port: 3306,
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    entities: [__dirname + '/entity/*.{ts,js}'],
    synchronize: true,
});