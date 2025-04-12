import { FarmService } from '../../services/farm/farm.service';
import { FarmGetDto } from '../dtos/farm.dto';
import { ExecutorType } from '../types/auth.types';
export declare class FarmController {
    private farmService;
    constructor(farmService: FarmService);
    get(farmGetDto: FarmGetDto, executor: ExecutorType): Promise<import("../../entities/farm.entity").Farm>;
}
