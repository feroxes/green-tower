import { UserService } from '../../services/user/user.service';
import { UserCreateCmdDto, UserDeleteDto, UserGetDto, UserSetRoleDto, UserUpdateDto } from '../dtos/user.dto';
import { ExecutorType } from '../types/auth.types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userCreateDto: UserCreateCmdDto, executor: ExecutorType): Promise<import("../../entities/user.entity").User>;
    update(userUpdateDto: UserUpdateDto, executor: ExecutorType): Promise<import("../../entities/user.entity").User>;
    delete(userDeleteDto: UserDeleteDto, executor: ExecutorType): Promise<object>;
    setRole(userSetRoleDto: UserSetRoleDto, executor: ExecutorType): Promise<object>;
    get(userGetDto: UserGetDto, executor: ExecutorType): Promise<import("../../entities/user.entity").User>;
    list(executor: ExecutorType): Promise<import("../types/dto-types").ListResponseType<import("../../entities/user.entity").User>>;
}
