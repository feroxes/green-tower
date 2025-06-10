import { MetaType } from './types';

export enum PlantType {
  MICROGREEN = 'microgreen',
  COMMON = 'common',
}

export type PlantDto = {
  id: string;
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
  expectedHarvestGramsPerGramOfSeeds: number;
  sellPricePerGram: number;
  sellPricePerPlate: number;
  activePlantings?: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PlantListDto = {
  itemList: PlantDto[];
  meta: MetaType;
};
