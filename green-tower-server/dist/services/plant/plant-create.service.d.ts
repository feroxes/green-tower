import { Repository } from 'typeorm';
import { Plant } from '../../entities/plant.entity';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';
import { PlantCreateDto } from '../../api/dtos/plant.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class PlantCreateService {
    private plantRepository;
    private userComponent;
    private farmComponent;
    constructor(plantRepository: Repository<Plant>, userComponent: UserComponent, farmComponent: FarmComponent);
    create(plantCreateDto: PlantCreateDto, executor: ExecutorType): Promise<Plant>;
}
