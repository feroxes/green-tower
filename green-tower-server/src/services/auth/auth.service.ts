import { Injectable } from '@nestjs/common';

import { AuthConfirmEmailService } from './auth-confirm-email.service';
import { AuthLoginService } from './auth-login.service';
import { AuthRefreshService } from './auth-refresh.service';
import { AuthResendConfirmationEmailService } from './auth-resend-confirmation-email.service';
import { AuthSignupService } from './auth-signup.service';

import {
  AuthResponseDto,
  ConfirmEmailDto,
  LoginDto,
  RefreshDto,
  RegisterDto,
  ResendConfirmationEmailDto,
} from '../../api/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private authSignupService: AuthSignupService,
    private authLoginService: AuthLoginService,
    private authConfirmEmailService: AuthConfirmEmailService,
    private authRefreshService: AuthRefreshService,
    private authResendConfirmationEmail: AuthResendConfirmationEmailService,
  ) {}

  register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authSignupService.register(registerDto);
  }

  login(loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authLoginService.login(loginDto);
  }

  refresh(refreshDto: RefreshDto): Promise<{ newAccessToken: string }> {
    return this.authRefreshService.refresh(refreshDto);
  }

  confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<object> {
    return this.authConfirmEmailService.confirmEmail(confirmEmailDto);
  }

  resendConfirmationEmail(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object> {
    return this.authResendConfirmationEmail.resend(resendConfirmationEmailDto);
  }
}
