import { Module, Global } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@/account/user';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '@/account/user';
import { ConfigModule, ConfigService } from '@/config';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
        };
        return options;
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
