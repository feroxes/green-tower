import { PlantCreateService } from './plant-create.service';
import { PlantDeleteService } from './plant-delete.service';
import { PlantGetService } from './plant-get.service';
import { PlantListService } from './plant-list.service';
import { PlantUpdateService } from './plant-update.service';
import { PlantCreateDto, PlantDeleteDto, PlantGetDto, PlantListDto, PlantUpdateDto } from '../../api/dtos/plant.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class PlantService {
    private plantCreateService;
    private plantUpdateService;
    private plantGetService;
    private plantDeleteService;
    private plantListService;
    constructor(plantCreateService: PlantCreateService, plantUpdateService: PlantUpdateService, plantGetService: PlantGetService, plantDeleteService: PlantDeleteService, plantListService: PlantListService);
    create(plantCreateDto: PlantCreateDto, executor: ExecutorType): Promise<import("../../entities/plant.entity").Plant>;
    update(plantUpdateDto: PlantUpdateDto, executor: ExecutorType): Promise<import("../../entities/plant.entity").Plant>;
    get(plantGetDto: PlantGetDto, executor: ExecutorType): Promise<import("../../entities/plant.entity").Plant>;
    delete(plantDeleteDto: PlantDeleteDto, executor: ExecutorType): Promise<object>;
    list(plantListDto: PlantListDto, executor: ExecutorType): Promise<import("../../api/types/dto-types").ListResponseType<import("../../entities/plant.entity").Plant>>;
}
