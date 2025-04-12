import { Repository } from 'typeorm';
import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';
import { EmailService } from '../email/email.service';
import { UserComponent } from '../../components/user.component';
import { RegisterDto } from '../../api/dtos/auth.dto';
export declare class AuthSignupService {
    private userRepository;
    private farmRepository;
    private userComponent;
    private emailService;
    constructor(userRepository: Repository<User>, farmRepository: Repository<Farm>, userComponent: UserComponent, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<object>;
}
