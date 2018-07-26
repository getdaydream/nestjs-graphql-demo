import * as consola from 'consola';

const config = {
    mysql: {
        host: process.env.MYSQL_HOST,
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    tokenSecret: 'test',
};

if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER
    || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE) {
        consola.error(new Error('You should config your mysql connection.'));
}

export { config };
