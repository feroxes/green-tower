import { UserRole } from '../../entities/user.entity';
export declare class UserCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole.OWNER | UserRole.ADMIN | UserRole.USER;
}
export declare class UserCreateCmdDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole.ADMIN | UserRole.USER;
}
export declare class UserUpdateDto {
    id: string;
    firstName: string;
    lastName: string;
}
export declare class UserDeleteDto {
    id: string;
}
export declare class UserSetRoleDto {
    id: string;
    role: UserRole.ADMIN | UserRole.USER;
}
export declare class UserGetDto {
    id?: string;
}
export declare class UserListFiltersDto {
}
