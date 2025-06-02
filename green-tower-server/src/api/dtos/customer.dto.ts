import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, MaxLength } from 'class-validator';

export class CustomerCreateDto {
  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(120)
  @IsOptional()
  contactName?: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @MaxLength(40)
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2024)
  notes?: string;
}

export class CustomerUpdateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
