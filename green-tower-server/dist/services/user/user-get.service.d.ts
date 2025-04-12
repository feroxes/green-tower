import { User } from '../../entities/user.entity';
import { UserComponent } from '../../components/user.component';
import { UserGetDto } from '../../api/dtos/user.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class UserGetService {
    private userComponent;
    constructor(userComponent: UserComponent);
    get(userGetDto: UserGetDto, executor: ExecutorType): Promise<User>;
}
