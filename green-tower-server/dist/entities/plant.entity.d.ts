import { Farm } from './farm.entity';
import { User } from './user.entity';
export declare enum PlantType {
    MICROGREEN = "microgreen",
    COMMON = "common"
}
export declare class Plant {
    id: string;
    name: string;
    description: string;
    notes: string;
    imageUrl: string;
    type: PlantType;
    expectedHoursToHarvest: number;
    hoursToSoak: number;
    hoursToMoveToLight: number;
    shouldBePressed: boolean;
    seedsGramPerPlate: number;
    expectedHarvestGramsPerPlate: number;
    farm: Farm;
    createdBy: User;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
