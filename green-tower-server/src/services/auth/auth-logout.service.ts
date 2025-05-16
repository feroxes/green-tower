import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { LogoutDto } from '../../api/dtos/auth.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class AuthLogoutService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logout(logoutDto: LogoutDto, executor: ExecutorType): Promise<object> {
    const { refreshToken } = logoutDto;
    if (!refreshToken) return {};

    const user = await this.userRepository.findOne({ where: { id: executor.id } });
    if (user) {
      user.refreshToken = null;
      await this.userRepository.save(user);
    }
    return {};
  }
}
