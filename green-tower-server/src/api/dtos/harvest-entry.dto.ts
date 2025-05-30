import { IsNotEmpty, IsNumber, IsUUID, Min, ValidateIf } from 'class-validator';

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
}
