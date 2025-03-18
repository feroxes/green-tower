import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class UserCreateDto {
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
  role: UserRole.ADMIN | UserRole.USER | UserRole.OWNER;
}

export class UserCreateCmdDto {
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
  role: UserRole.ADMIN | UserRole.USER;
}
