import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthConstants } from '@utils/constants';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@entities/user.entity';

import { generateTokensErrors, refreshAccessTokenErrors } from '@errors/token-service.errors';

interface RefreshTokenPayload {
  sub: string;
  token: string;
}

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  generateEmailConfirmationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farm.id,
    };

    const refreshTokenPayload = {
      sub: user.id,
      token: uuidv4(),
    };
    user.refreshToken = await bcrypt.hash(refreshTokenPayload.token, 10);

    try {
      await this.userRepository.save(user);
    } catch (e: unknown) {
      throw generateTokensErrors.FailedToUpdateUser({ e });
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: AuthConstants.ACCESS_TOKEN_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: AuthConstants.REFRESH_TOKEN_EXPIRATION,
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    let refreshTokenPayload: RefreshTokenPayload;
    try {
      refreshTokenPayload = this.jwtService.verify<RefreshTokenPayload>(refreshToken);
    } catch (e: unknown) {
      throw refreshAccessTokenErrors.RefreshTokenVerificationFailed({ e });
    }
    const user = await this.userRepository.findOne({
      where: { id: refreshTokenPayload.sub },
      relations: ['farm'],
    });
    if (!user || !user.refreshToken) {
      throw refreshAccessTokenErrors.UserDoesNotExist();
    }

    const isValid = await bcrypt.compare(refreshTokenPayload.token, user.refreshToken);

    if (!isValid) {
      throw refreshAccessTokenErrors.InvalidRefreshToken();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farm.id,
    };

    return this.jwtService.sign(payload, {
      expiresIn: AuthConstants.ACCESS_TOKEN_EXPIRATION,
    });
  }
}
