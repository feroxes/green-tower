import { User } from '../../entities/user.entity';
import { UserComponent } from '../../components/user.component';
import { ExecutorType } from '../../api/types/auth.types';
import { ListResponseType } from '../../api/types/dto-types';
export declare class UserListService {
    private userComponent;
    constructor(userComponent: UserComponent);
    list(executor: ExecutorType): Promise<ListResponseType<User>>;
}
