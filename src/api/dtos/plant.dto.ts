import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { PlantType } from '../../entities/plant.entity';

export class PlantCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(120)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  description: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  notes: string;

  @IsUrl()
  @MinLength(3)
  @MaxLength(512)
  imageUrl: string;

  @IsEnum(PlantType)
  @IsNotEmpty()
  type: PlantType.MICROGREEN | PlantType.COMMON;

  @IsNumber()
  @Min(1)
  expectedHoursToHarvest: number;

  @IsNumber()
  @Min(0)
  hoursToSoak: number;

  @IsNumber()
  @Min(1)
  hoursToMoveToLight: number;

  @IsBoolean()
  shouldBePressed: boolean;

  @IsNumber()
  @Min(1)
  seedsGramPerPlate: number;

  @IsNumber()
  @Min(1)
  expectedHarvestGramsPerPlate: number;
}
export class PlantUpdateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  description: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  notes: string;

  @IsUrl()
  @MinLength(3)
  @MaxLength(512)
  imageUrl: string;

  @IsEnum(PlantType)
  @IsNotEmpty()
  type: PlantType.MICROGREEN | PlantType.COMMON;

  @IsNumber()
  @Min(1)
  expectedHoursToHarvest: number;

  @IsNumber()
  @Min(0)
  hoursToSoak: number;

  @IsNumber()
  @Min(1)
  hoursToMoveToLight: number;

  @IsBoolean()
  shouldBePressed: boolean;

  @IsNumber()
  @Min(1)
  seedsGramPerPlate: number;

  @IsNumber()
  @Min(1)
  expectedHarvestGramsPerPlate: number;
}

export class PlantGetDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class PlantDeleteDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
