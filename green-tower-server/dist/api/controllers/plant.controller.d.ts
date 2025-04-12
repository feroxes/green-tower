import { PlantService } from '../../services/plant/plant.service';
import { PlantCreateDto, PlantDeleteDto, PlantGetDto, PlantListDto, PlantUpdateDto } from '../dtos/plant.dto';
import { ExecutorType } from '../types/auth.types';
export declare class PlantController {
    private readonly plantService;
    constructor(plantService: PlantService);
    create(plantCreateDto: PlantCreateDto, executor: ExecutorType): Promise<import("../../entities/plant.entity").Plant>;
    update(plantUpdateDto: PlantUpdateDto, executor: ExecutorType): Promise<import("../../entities/plant.entity").Plant>;
    get(plantGetDto: PlantGetDto, executor: ExecutorType): Promise<import("../../entities/plant.entity").Plant>;
    delete(plantDeleteDto: PlantDeleteDto, executor: ExecutorType): Promise<object>;
    let(plantListDto: PlantListDto, executor: ExecutorType): Promise<import("../types/dto-types").ListResponseType<import("../../entities/plant.entity").Plant>>;
}
