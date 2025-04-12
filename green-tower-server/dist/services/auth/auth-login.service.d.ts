import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { TokenService } from '../token/token.service';
import { AuthResponseDto, LoginDto } from '../../api/dtos/auth.dto';
export declare class AuthLoginService {
    private readonly userRepository;
    private tokenService;
    constructor(userRepository: Repository<User>, tokenService: TokenService);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
}
