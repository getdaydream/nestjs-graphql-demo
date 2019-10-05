import { UserModule } from '@/account/user';
import { UserService } from '@/account/user';
import { ConfigModule, ConfigService } from '@/config';
import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

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
