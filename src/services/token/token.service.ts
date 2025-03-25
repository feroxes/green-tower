import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { User } from '../../entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateEmailConfirmationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  generateAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farm.id,
    };

    return this.jwtService.sign(payload);
  }
}
