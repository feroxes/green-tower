import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator';

import { OrderItemType } from '@entities/order-item.entity';

export class OrderCreateItemDto {
  @IsUUID()
  @IsNotEmpty()
  plantId: string;

  @IsEnum(OrderItemType)
  @IsNotEmpty()
  type: OrderItemType;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amountOfPlates?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  amountOfGrams?: number;
}

export class OrderCreateDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderCreateItemDto)
  items: OrderCreateItemDto[];
}
