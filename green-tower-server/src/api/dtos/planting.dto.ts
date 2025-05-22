import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

export class PlantingCreateDto {
  @IsUUID()
  @IsNotEmpty()
  plantId: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  notes: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfPlates: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfGramsOfSeeds: number;
}

export class PlantingUpdateDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  plantId?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  notes?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amountOfPlates?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amountOfGramsOfSeeds?: number;
}
