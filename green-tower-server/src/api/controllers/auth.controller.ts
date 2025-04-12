import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

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
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response): Promise<AuthResponseDto> {
    const result = await this.authService.login(loginDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    response.cookie('refreshToken', result.refreshToken, cookieOptions);

    return {
      accessToken: result.accessToken,
    };
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
