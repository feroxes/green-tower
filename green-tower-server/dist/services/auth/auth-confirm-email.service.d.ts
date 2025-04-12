import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { ConfirmEmailDto } from '../../api/dtos/auth.dto';
export declare class AuthConfirmEmailService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<object>;
}
