import { Injectable } from '@nestjs/common';

import { AuthConfirmEmailService } from './auth-confirm-email.service';
import { AuthLoginService } from './auth-login.service';
import { AuthLogoutService } from './auth-logout.service';
import { AuthRefreshService } from './auth-refresh.service';
import { AuthResendConfirmationEmailService } from './auth-resend-confirmation-email.service';
import { AuthSignupService } from './auth-signup.service';

import {
  AuthResponseDto,
  ConfirmEmailDto,
  LoginDto,
  LogoutDto,
  RefreshDto,
  RegisterDto,
  ResendConfirmationEmailDto,
} from '../../api/dtos/auth.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private authSignupService: AuthSignupService,
    private authLoginService: AuthLoginService,
    private authLogoutService: AuthLogoutService,
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

  logout(logoutDto: LogoutDto, executor: ExecutorType): Promise<AuthResponseDto> {
    return this.authLogoutService.logout(logoutDto, executor);
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
