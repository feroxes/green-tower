import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';
import { UserSetRoleDto } from '../../api/dtos/user.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class UserSetRoleService {
    private userRepository;
    private userComponent;
    private farmComponent;
    constructor(userRepository: Repository<User>, userComponent: UserComponent, farmComponent: FarmComponent);
    setRole(userSetRoleDto: UserSetRoleDto, executor: ExecutorType): Promise<object>;
}
