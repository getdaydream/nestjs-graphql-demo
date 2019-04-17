import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, { expiresIn: '10h' });
  }
}
