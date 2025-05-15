import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

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

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string;

    const { newAccessToken } = await this.authService.refresh({ refreshToken });
    res.setHeader('New-Access-Token', 'Bearer ' + newAccessToken);
    return { newAccessToken };
  }

  @Get('confirmEmail/:token')
  async confirmEmail(@Param('token') token: string): Promise<object> {
    const confirmEmailDto = { token } as ConfirmEmailDto;
    return this.authService.confirmEmail(confirmEmailDto);
  }

  @Post('resendConfirmationEmail')
  async resendConfirmationEmail(@Body() resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object> {
    return this.authService.resendConfirmationEmail(resendConfirmationEmailDto);
  }
}
