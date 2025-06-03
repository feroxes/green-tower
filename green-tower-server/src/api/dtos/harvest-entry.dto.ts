import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateIf } from 'class-validator';

import { HarvestEntryState } from '@entities/harvest-entry.entity';

export class HarvestEntryCreateCutDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  harvestGram: number;

  @ValidateIf((obj: HarvestEntryCreateCutDto) => !obj.plantId)
  @IsUUID()
  @IsNotEmpty()
  plantingId?: string;

  @ValidateIf((obj: HarvestEntryCreateCutDto) => !obj.plantingId)
  @IsUUID()
  @IsNotEmpty()
  plantId?: string;

  @IsEnum(HarvestEntryState)
  @IsOptional()
  state?: HarvestEntryState;
}

export class HarvestEntryCreatePlateDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  harvestGram: number;

  @ValidateIf((obj: HarvestEntryCreateCutDto) => !obj.plantId)
  @IsUUID()
  @IsNotEmpty()
  plantingId?: string;

  @ValidateIf((obj: HarvestEntryCreateCutDto) => !obj.plantingId)
  @IsUUID()
  @IsNotEmpty()
  plantId?: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfPlates: number;

  @IsEnum(HarvestEntryState)
  @IsOptional()
  state?: HarvestEntryState;
}

export class HarvestEntryCutPlateDto {
  @IsUUID()
  @IsNotEmpty()
  harvestEntryId: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfPlates: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amountOfGrams: number;
}
