import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
}

export class AuthResponseDto {
  accessToken?: string;
  refreshToken?: string;
}

export class ResendConfirmationEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
