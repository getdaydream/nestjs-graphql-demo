/**
 * 
 */
// tslint:disable-next-line:no-require-imports
import mongoose  = require('mongoose');
import { config } from '../config';

mongoose.Promise = global.Promise;

export const connectMongodb = () => {
  return mongoose.connect(config.mongodbUri);
}; 
