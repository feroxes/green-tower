import { Repository } from 'typeorm';
import { Plant } from '../entities/plant.entity';
import { PlantListFiltersDto, PlantListSortersDto } from '../api/dtos/plant.dto';
import { ExecutorType } from '../api/types/auth.types';
import { ListMetaDto, ListResponseType } from '../api/types/dto-types';
export declare class PlantComponent {
    private plantRepository;
    constructor(plantRepository: Repository<Plant>);
    checkPlantExistence(filter: {
        id: string;
        farm: {
            id: string;
        };
    }, errorCode: string, params?: object): Promise<Plant>;
    list(executor: ExecutorType, meta: ListMetaDto, filters?: PlantListFiltersDto, sorters?: PlantListSortersDto): Promise<ListResponseType<Plant>>;
}
