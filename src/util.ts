/**
 * 
 */
import * as jwt from 'jsonwebtoken';
import { config } from './config';

export const genToken = (id) => {
  return jwt.sign({
    id
  }, config.secretKey,{ expiresIn: '10h' }); 
};