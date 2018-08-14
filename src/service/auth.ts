import { sign } from 'jsonwebtoken';

export const authService = {
  createToken(id): string {
    const payload = {
      id,
    };
    const signOptions = {
      expiresIn: '100h',
    };
    return sign(payload, process.env.TOKEN_SECRET, signOptions);
  },
};
