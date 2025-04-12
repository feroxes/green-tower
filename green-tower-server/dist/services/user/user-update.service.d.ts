import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';
import { UserUpdateDto } from '../../api/dtos/user.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class UserUpdateService {
    private userRepository;
    private userComponent;
    private farmComponent;
    constructor(userRepository: Repository<User>, userComponent: UserComponent, farmComponent: FarmComponent);
    update(userUpdateDto: UserUpdateDto, executor: ExecutorType): Promise<User>;
}
