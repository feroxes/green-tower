import { Repository } from 'typeorm';
import { Plant } from '../../entities/plant.entity';
import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';
import { PlantUpdateDto } from '../../api/dtos/plant.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class PlantUpdateService {
    private plantRepository;
    private userComponent;
    private farmComponent;
    private plantComponent;
    constructor(plantRepository: Repository<Plant>, userComponent: UserComponent, farmComponent: FarmComponent, plantComponent: PlantComponent);
    update(plantUpdateDto: PlantUpdateDto, executor: ExecutorType): Promise<Plant>;
}
