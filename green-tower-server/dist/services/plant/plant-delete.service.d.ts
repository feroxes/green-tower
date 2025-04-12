import { Repository } from 'typeorm';
import { Plant } from '../../entities/plant.entity';
import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';
import { PlantDeleteDto } from '../../api/dtos/plant.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class PlantDeleteService {
    private plantRepository;
    private userComponent;
    private farmComponent;
    private plantComponent;
    constructor(plantRepository: Repository<Plant>, userComponent: UserComponent, farmComponent: FarmComponent, plantComponent: PlantComponent);
    delete(plantDeleteDto: PlantDeleteDto, executor: ExecutorType): Promise<object>;
}
