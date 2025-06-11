import { MetaType } from './types';

export enum PlantType {
  MICROGREEN = 'microgreen',
  COMMON = 'common',
}

export type PlantCreateDto = {
  name: string;
  description?: string | null;
  notes?: string | null;
  imageUrl?: string | null;
  type: PlantType;
  expectedHoursToHarvest: number;
  hoursToSoak?: number | null;
  hoursToMoveToLight?: number | null;
  shouldBePressed?: boolean | null;
  seedsGramPerPlate: number;
  expectedHarvestGramsPerPlate: number;
  sellPricePerPlate: number;
};

export interface PlantDto extends PlantCreateDto {
  id: string;
  activePlantings?: number;
  sellPricePerGram: number;
  expectedHarvestGramsPerGramOfSeeds: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PlantListDto = {
  itemList: PlantDto[];
  meta: MetaType;
};
