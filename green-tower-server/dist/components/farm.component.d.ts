import { Repository } from 'typeorm';
import { Farm } from '../entities/farm.entity';
export declare class FarmComponent {
    private farmRepository;
    constructor(farmRepository: Repository<Farm>);
    checkFarmExistence(id: string, errorCode: string, params?: object): Promise<Farm>;
}
