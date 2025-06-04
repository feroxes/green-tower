import { PlantingType } from '@entities/enums/planting-type.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { ListMetaDto } from '@app-types/dto.types';

export class OrderCreateDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderCreateItemDto)
  items: OrderCreateItemDto[];
}

export class OrderCreateItemDto {
  @IsUUID()
  @IsNotEmpty()
  plantId: string;

  @IsEnum(PlantingType)
  @IsNotEmpty()
  type: PlantingType;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;

  @ValidateIf((obj: OrderCreateItemDto) => obj.type === PlantingType.PLATE)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amountOfPlates?: number;

  @ValidateIf((obj: OrderCreateItemDto) => obj.type === PlantingType.CUT)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amountOfGrams?: number;
}

export class OrderListDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => ListMetaDto)
  meta: ListMetaDto;
}

export class OrderDeleteDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
