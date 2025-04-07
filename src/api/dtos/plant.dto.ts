import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { PlantType } from '../../entities/plant.entity';

import { SortDirectionType } from '../types/common.types';

import { ListMetaDto } from '../types/dto-types';

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

export class PlantListFiltersDto {
  @IsEnum(PlantType)
  @IsOptional()
  type?: PlantType.MICROGREEN | PlantType.COMMON;

  @IsUUID()
  @IsOptional()
  createdBy?: string;
}

export class PlantListSortersDto {
  @IsEnum(SortDirectionType)
  @IsOptional()
  createdAt?: SortDirectionType.ASC | SortDirectionType.DESC;
}

export class PlantListDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => ListMetaDto)
  meta: ListMetaDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlantListFiltersDto)
  filters?: PlantListFiltersDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlantListSortersDto)
  sorters?: PlantListSortersDto;
}
