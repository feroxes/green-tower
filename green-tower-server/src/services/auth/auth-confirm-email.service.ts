import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { ConfirmEmailDto } from '../../api/dtos/auth.dto';

import { confirmEmailError } from '../../api/errors/auth.errors';

@Injectable()
export class AuthConfirmEmailService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<object> {
    const { token } = confirmEmailDto;
    const user = await this.userRepository.findOne({
      where: { emailConfirmationToken: token },
    });

    if (!user) {
      throw confirmEmailError.InvalidConfirmationToken();
    }

    if (user.emailConfirmationExpires && user.emailConfirmationExpires < new Date()) {
      throw confirmEmailError.ConfirmationTokenExpired();
    }

    user.isEmailConfirmed = true;
    user.emailConfirmationToken = null;
    user.emailConfirmationExpires = null;

    try {
      await this.userRepository.save(user);
    } catch (e: unknown) {
      throw confirmEmailError.FailedToUpdateUser({ e });
    }
    return {};
  }
}
