import { PlantType } from '../../entities/plant.entity';
import { SortDirectionType } from '../types/common.types';
import { ListMetaDto } from '../types/dto-types';
export declare class PlantCreateDto {
    name: string;
    description: string;
    notes: string;
    imageUrl: string;
    type: PlantType.MICROGREEN | PlantType.COMMON;
    expectedHoursToHarvest: number;
    hoursToSoak: number;
    hoursToMoveToLight: number;
    shouldBePressed: boolean;
    seedsGramPerPlate: number;
    expectedHarvestGramsPerPlate: number;
}
export declare class PlantUpdateDto {
    id: string;
    name: string;
    description: string;
    notes: string;
    imageUrl: string;
    type: PlantType.MICROGREEN | PlantType.COMMON;
    expectedHoursToHarvest: number;
    hoursToSoak: number;
    hoursToMoveToLight: number;
    shouldBePressed: boolean;
    seedsGramPerPlate: number;
    expectedHarvestGramsPerPlate: number;
}
export declare class PlantGetDto {
    id: string;
}
export declare class PlantDeleteDto {
    id: string;
}
export declare class PlantListFiltersDto {
    type?: PlantType.MICROGREEN | PlantType.COMMON;
    createdBy?: string;
}
export declare class PlantListSortersDto {
    createdAt?: SortDirectionType.ASC | SortDirectionType.DESC;
}
export declare class PlantListDto {
    meta: ListMetaDto;
    filters?: PlantListFiltersDto;
    sorters?: PlantListSortersDto;
}
