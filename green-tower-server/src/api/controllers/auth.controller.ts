import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

import { AuthorizedGuard } from '@guards/authorized.guard';

import { Executor } from '@decorators/executor.decorator';

import { AuthService } from '@services/auth/auth.service';

import { AuthResponseDto, ConfirmEmailDto, LoginDto, RegisterDto, ResendConfirmationEmailDto } from '@dtos/auth.dto';

import { ExecutorType } from '@app-types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    const result = await this.authService.login(loginDto);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    res.cookie('refreshToken', result.refreshToken, cookieOptions);

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthorizedGuard)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Executor() executor: ExecutorType,
  ): Promise<object> {
    const refreshToken = req.cookies?.refreshToken as string;
    await this.authService.logout({ refreshToken }, executor);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return {};
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    let refreshToken = '';
    if (req.cookies) {
      refreshToken = req.cookies['refreshToken'] as string;
    }
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
