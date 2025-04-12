import { Farm } from './farm.entity';
import { Plant } from './plant.entity';
export declare enum UserRole {
    OWNER = "owner",
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isEmailConfirmed: boolean;
    emailConfirmationToken: string | null;
    emailConfirmationExpires: Date | null;
    refreshToken: string | null;
    farm: Farm;
    plants: Plant[];
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
