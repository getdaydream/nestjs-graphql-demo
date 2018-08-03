import * as winston from 'winston';
import * as path from 'path';

const logDirname = path.resolve(__dirname, '../../log/');

/**
 * logging levels are prioritized from 0 to 5 (highest to lowest):
 *  error: 0
 *  warn: 1
 *  info: 2
 *  verbose: 3
 *  debug: 4
 *  silly: 5
 */

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      dirname: logDirname,
      filename: 'error.log',
      level: 'error',
    }),
  ],
});
