import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

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
