import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './auth.interface';
import { UserService } from '../user';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: 'dddddddddddddddd',
    });
  }

  async validate(jwtPayload: JwtPayload) {
    const user = await this.userService.getOneByEmail(jwtPayload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
