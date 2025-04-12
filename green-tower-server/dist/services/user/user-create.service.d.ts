import { User } from '../../entities/user.entity';
import { EmailService } from '../email/email.service';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';
import { UserCreateCmdDto } from '../../api/dtos/user.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class UserCreateService {
    private userComponent;
    private farmComponent;
    private emailService;
    constructor(userComponent: UserComponent, farmComponent: FarmComponent, emailService: EmailService);
    create(userCreateDto: UserCreateCmdDto, executor: ExecutorType): Promise<User>;
}
