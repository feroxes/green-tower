import { Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto, AuthResponseDto } from '../../dtos/auth.dto';
import { AuthSignupService } from './auth-signup.service';
import { AuthLoginService } from './auth-login.service';

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
