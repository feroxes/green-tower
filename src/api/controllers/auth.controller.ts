import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AuthService } from '../../services/auth/auth.service';

import { AuthResponseDto, ConfirmEmailDto, LoginDto, RegisterDto, ResendConfirmationEmailDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('confirmEmail/:token')
  async confirmEmail(@Param('token') token: string): Promise<object> {
    const confirmEmailDto = { token } as ConfirmEmailDto;
    return this.authService.confirmEmail(confirmEmailDto);
  }

  @Get('resendConfirmationEmail')
  async resendConfirmationEmail(@Body() resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object> {
    return this.authService.resendConfirmationEmail(resendConfirmationEmailDto);
  }
}
