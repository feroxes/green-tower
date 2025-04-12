export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    farmName: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ConfirmEmailDto {
    token: string;
}
export interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    maxAge: number;
}
export declare class AuthResponseDto {
    accessToken?: string;
    refreshToken?: string;
}
export declare class ResendConfirmationEmailDto {
    email: string;
}
