import { Plant } from '../../entities/plant.entity';
import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';
import { PlantGetDto } from '../../api/dtos/plant.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class PlantGetService {
    private userComponent;
    private farmComponent;
    private plantComponent;
    constructor(userComponent: UserComponent, farmComponent: FarmComponent, plantComponent: PlantComponent);
    get(plantGetDto: PlantGetDto, executor: ExecutorType): Promise<Plant>;
}
