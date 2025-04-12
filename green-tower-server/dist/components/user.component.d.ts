import { Repository } from 'typeorm';
import { Farm } from '../entities/farm.entity';
import { User } from '../entities/user.entity';
import { TokenService } from '../services/token/token.service';
import { UserCreateDto } from '../api/dtos/user.dto';
import { ExecutorType } from '../api/types/auth.types';
import { ListMetaDto, ListResponseType } from '../api/types/dto-types';
export declare class UserComponent {
    private userRepository;
    private tokenService;
    constructor(userRepository: Repository<User>, tokenService: TokenService);
    create(createDto: UserCreateDto, farm: Farm, errorCode: string): Promise<{
        user: User;
    }>;
    list(executor: ExecutorType, meta?: ListMetaDto): Promise<ListResponseType<User>>;
    checkUserExistence(id: string, farmId: string, errorCode: string): Promise<User>;
}
