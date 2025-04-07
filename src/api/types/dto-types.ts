import { IsInt, IsOptional } from 'class-validator';

export class ListMetaDto {
  @IsInt()
  @IsOptional()
  page: number;

  @IsInt()
  @IsOptional()
  size: number;
}

export type ListMetaType = {
  page: number;
  size: number;
  total: number;
};

export class ListResponseType<T> {
  itemList: T[];
  meta: ListMetaType;
}
