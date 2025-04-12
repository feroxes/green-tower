import { Injectable } from '@nestjs/common';

import { AuthConfirmEmailService } from './auth-confirm-email.service';
import { AuthLoginService } from './auth-login.service';
import { AuthResendConfirmationEmailService } from './auth-resend-confirmation-email.service';
import { AuthSignupService } from './auth-signup.service';

import {
  AuthResponseDto,
  ConfirmEmailDto,
  LoginDto,
  RegisterDto,
  ResendConfirmationEmailDto,
} from '../../api/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private authSignupService: AuthSignupService,
    private authLoginService: AuthLoginService,
    private authConfirmEmailService: AuthConfirmEmailService,
    private authResendConfirmationEmail: AuthResendConfirmationEmailService,
  ) {}

  register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authSignupService.register(registerDto);
  }

  login(loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authLoginService.login(loginDto);
  }

  confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<object> {
    return this.authConfirmEmailService.confirmEmail(confirmEmailDto);
  }

  resendConfirmationEmail(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object> {
    return this.authResendConfirmationEmail.resend(resendConfirmationEmailDto);
  }
}
