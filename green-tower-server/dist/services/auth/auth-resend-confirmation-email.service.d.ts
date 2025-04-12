import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';
import { ResendConfirmationEmailDto } from '../../api/dtos/auth.dto';
export declare class AuthResendConfirmationEmailService {
    private userRepository;
    private tokenService;
    private emailService;
    constructor(userRepository: Repository<User>, tokenService: TokenService, emailService: EmailService);
    resend(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object>;
}
