import { Plant } from '../../entities/plant.entity';
import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';
import { PlantListDto } from '../../api/dtos/plant.dto';
import { ExecutorType } from '../../api/types/auth.types';
import { ListResponseType } from '../../api/types/dto-types';
export declare class PlantListService {
    private userComponent;
    private farmComponent;
    private plantComponent;
    constructor(userComponent: UserComponent, farmComponent: FarmComponent, plantComponent: PlantComponent);
    list(plantListDto: PlantListDto, executor: ExecutorType): Promise<ListResponseType<Plant>>;
}
