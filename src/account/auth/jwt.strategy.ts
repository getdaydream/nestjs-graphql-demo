import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './auth.interface';
import { UserService } from '../user';
// import { Request } from 'express';
import { ConfigService } from 'src/config';
import { AuthenticationError } from 'apollo-server-core';

// const cookieExtractor = (req: Request) => {
//   let token = null;
//   if (req && req.cookies && req.cookies.token) {
//     token = req.cookies.token;
//   }
//   return token;
// };

// TODO: use cookie to store token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(jwtPayload: JwtPayload) {
    const user = await this.userService.getOneByEmail(jwtPayload.email);
    if (!user) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    }
    return user;
  }
}
