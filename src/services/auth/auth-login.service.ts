import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { TokenService } from '../token/token.service';

import { AuthResponseDto, LoginDto } from '../../api/dtos/auth.dto';

import { loginError } from '../../api/errors/auth.errors';

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['farm'],
    });

    if (!user) {
      throw loginError.InvalidCredentials();
    }

    if (!user.isEmailConfirmed) {
      throw loginError.EmailNotConfirmed();
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw loginError.InvalidCredentials();
    }

    const { accessToken, refreshToken } = await this.tokenService.generateTokens(user);

    return { accessToken, refreshToken };
  }
}
