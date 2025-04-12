import { Response } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import { AuthResponseDto, LoginDto, RegisterDto, ResendConfirmationEmailDto } from '../dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto, response: Response): Promise<AuthResponseDto>;
    confirmEmail(token: string): Promise<object>;
    resendConfirmationEmail(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object>;
}
