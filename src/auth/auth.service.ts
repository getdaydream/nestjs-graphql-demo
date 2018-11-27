import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
