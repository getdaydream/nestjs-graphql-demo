import { sign, verify } from 'jsonwebtoken';
import { config } from 'config';

export const authService = {
  createToken(id): string {
    const payload = {
      id,
    };
    const signOptions = {
      expiresIn: '2h',
    };
    return sign(payload, config.tokenSecret, signOptions);
  },
  verifyToken(token: string) {
    // return verify(token, config.tokenSecret);
    console.log(verify(token, config.tokenSecret));
  },
};
