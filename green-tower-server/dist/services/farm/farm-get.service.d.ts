import { Farm } from '../../entities/farm.entity';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';
import { FarmGetDto } from '../../api/dtos/farm.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class FarmGetService {
    private userComponent;
    private farmComponent;
    constructor(userComponent: UserComponent, farmComponent: FarmComponent);
    get(farmGetDto: FarmGetDto, executor: ExecutorType): Promise<Farm>;
}
