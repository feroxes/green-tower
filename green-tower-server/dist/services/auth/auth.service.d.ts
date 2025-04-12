import { AuthConfirmEmailService } from './auth-confirm-email.service';
import { AuthLoginService } from './auth-login.service';
import { AuthResendConfirmationEmailService } from './auth-resend-confirmation-email.service';
import { AuthSignupService } from './auth-signup.service';
import { AuthResponseDto, ConfirmEmailDto, LoginDto, RegisterDto, ResendConfirmationEmailDto } from '../../api/dtos/auth.dto';
export declare class AuthService {
    private authSignupService;
    private authLoginService;
    private authConfirmEmailService;
    private authResendConfirmationEmail;
    constructor(authSignupService: AuthSignupService, authLoginService: AuthLoginService, authConfirmEmailService: AuthConfirmEmailService, authResendConfirmationEmail: AuthResendConfirmationEmailService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<object>;
    resendConfirmationEmail(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<object>;
}
