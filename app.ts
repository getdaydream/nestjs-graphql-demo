import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default (app) => {
    app.beforeStart(async () => {
        await createConnection({
            type: 'mongodb',
            host: 'localhost',
            database: 'codedays',
            entities: ['app/entity/*.ts'],
            synchronize: true,
        });
    });
};
