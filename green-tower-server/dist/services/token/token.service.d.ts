import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class TokenService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    generateEmailConfirmationToken(): string;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshAccessToken(refreshToken: string): Promise<string>;
}
