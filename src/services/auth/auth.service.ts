import { Injectable } from '@nestjs/common';

import { AuthLoginService } from './auth-login.service';
import { AuthSignupService } from './auth-signup.service';

import { AuthResponseDto, LoginDto, RegisterDto } from '../../api/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private authSignupService: AuthSignupService,
    private authLoginService: AuthLoginService,
  ) {}

  register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authSignupService.register(registerDto);
  }

  login(loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authLoginService.login(loginDto);
  }
}
