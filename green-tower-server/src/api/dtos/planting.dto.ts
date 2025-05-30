import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { Planting, PlantingState } from '../../entities/planting.entity';

import { SortDirectionType } from '../types/common.types';

import { PlantingType } from '../../entities/enums/planting-type.enum';
import { ListMetaDto } from '../types/dto-types';

export class PlantingCreateDto {
  @IsUUID()
  @IsNotEmpty()
  plantId: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  notes: string;

  @ValidateIf((obj: Planting) => obj.type === PlantingType.PLATE)
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfPlates: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfGramsOfSeeds: number;

  @IsEnum(PlantingType)
  @IsNotEmpty()
  type: PlantingType;
}

export class PlantingUpdateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsUUID()
  plantId?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(2024)
  notes?: string | null;

  @ValidateIf((obj: Planting) => obj.type === PlantingType.PLATE)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amountOfPlates?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amountOfGramsOfSeeds?: number;

  @IsEnum(PlantingType)
  @IsNotEmpty()
  type?: PlantingType;
}

export class PlantingGetDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class PlantingDeleteDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class PlantingListFiltersDto {
  @IsEnum(PlantingState)
  @IsOptional()
  state?: PlantingState;
}

export class PlantingListSortersDto {
  @IsEnum(SortDirectionType)
  @IsOptional()
  harvestTs?: SortDirectionType.ASC | SortDirectionType.DESC;
}

export class PlantingListDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => ListMetaDto)
  meta?: ListMetaDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlantingListFiltersDto)
  filters?: PlantingListFiltersDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlantingListSortersDto)
  sorters?: PlantingListSortersDto;
}

export class PlantingSetStateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsIn([PlantingState.GROWING, PlantingState.READY, PlantingState.DEAD])
  @IsNotEmpty()
  state: PlantingState;
}
