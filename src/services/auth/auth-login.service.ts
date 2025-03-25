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
    private userRepository: Repository<User>,
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

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw loginError.InvalidCredentials();
    }

    if (!user.isEmailConfirmed) {
      throw loginError.EmailNotConfirmed();
    }

    const accessToken = this.tokenService.generateAccessToken(user);

    return { accessToken };
  }
}
