import { sign } from 'jsonwebtoken';

export const authService = {
  createToken(id): string {
    const payload = {
      id,
    };
    const signOptions = {
      expiresIn: '7 days',
    };
    return sign(payload, process.env.TOEKN_SECRET, signOptions);
  },
};
