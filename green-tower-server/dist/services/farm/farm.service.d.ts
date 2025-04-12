import { FarmGetService } from './farm-get.service';
import { FarmGetDto } from '../../api/dtos/farm.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class FarmService {
    private farmGetService;
    constructor(farmGetService: FarmGetService);
    get(farmGetDto: FarmGetDto, executor: ExecutorType): Promise<import("../../entities/farm.entity").Farm>;
}
