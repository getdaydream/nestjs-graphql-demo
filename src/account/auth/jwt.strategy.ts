import { UserService } from '@/account/user';
import { ConfigService } from '@/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-core';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.interface';

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
    const user = await this.userService.findOne({ email: jwtPayload.email });
    if (!user) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    }
    return user;
  }
}
