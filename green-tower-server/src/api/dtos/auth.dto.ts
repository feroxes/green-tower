import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { SupportedLanguages } from '@app-types/common.types';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  farmName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  language: SupportedLanguages = 'en';
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(40)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}

export class LogoutDto {
  @IsString()
  refreshToken: string;
}

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class AuthResponseDto {
  accessToken?: string;
  refreshToken?: string;
}

export class ResendConfirmationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  language: SupportedLanguages = 'en';
}
