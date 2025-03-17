import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginError } from '../../api/errors/auth.errors';
import { User } from '../../entities/user.entity';
import { LoginDto, AuthResponseDto } from '../../api/dtos/auth.dto';

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['farm'],
    });

    if (!user) {
      throw loginError.InvalidCredentials();
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw loginError.InvalidCredentials();
    }

    const token = this.generateToken(user);

    return {
      accessToken: token,
    };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      farmId: user.farm.id,
    };

    return this.jwtService.sign(payload);
  }
}
