import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

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

  @IsEnum(UserRole)
  role: UserRole.OWNER | UserRole.ADMIN | UserRole.USER;
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

  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  role: UserRole.ADMIN | UserRole.USER;
}

export class UserUpdateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName: string;
}

export class UserDeleteDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UserSetRoleDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  role: UserRole.ADMIN | UserRole.USER;
}

export class UserGetDto {
  @IsOptional()
  @IsUUID()
  id?: string;
}

export class UserListFiltersDto {}
