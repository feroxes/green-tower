import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';

import { ResendConfirmationEmailDto } from '../../api/dtos/auth.dto';

import { registerError, resendConfirmationEmailError } from '../../api/errors/auth.errors';

import { AuthConstants } from '../../utils/constants';

@Injectable()
export class AuthResendConfirmationEmailService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
    private emailService: EmailService,
  ) {}

  async resend(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object> {
    const { email } = resendConfirmationEmailDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw resendConfirmationEmailError.UserDoesNotExist();
    }

    if (user.isEmailConfirmed) {
      throw resendConfirmationEmailError.EmailAlreadyConfirmed();
    }

    const confirmationToken = this.tokenService.generateEmailConfirmationToken();

    const emailConfirmationExpires = new Date();
    emailConfirmationExpires.setHours(
      emailConfirmationExpires.getHours() + AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS,
    );

    user.emailConfirmationToken = confirmationToken;
    user.emailConfirmationExpires = emailConfirmationExpires;

    try {
      await this.userRepository.save(user);
    } catch (e: unknown) {
      throw resendConfirmationEmailError.FailedToUpdateUser({ e });
    }

    try {
      await this.emailService.sendEmailConfirmation(
        user.email,
        resendConfirmationEmailDto.language,
        user.emailConfirmationToken,
      );
    } catch (e: unknown) {
      throw registerError.FailedToSendConfirmationEmail({ e });
    }

    return {};
  }
}
