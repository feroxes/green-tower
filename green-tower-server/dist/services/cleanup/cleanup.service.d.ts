import { Repository } from 'typeorm';
import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';
export declare class CleanupService {
    private userRepository;
    private farmRepository;
    constructor(userRepository: Repository<User>, farmRepository: Repository<Farm>);
    removeUnconfirmedUsers(): Promise<void>;
}
