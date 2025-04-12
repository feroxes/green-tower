import { UserCreateService } from './user-create.service';
import { UserDeleteService } from './user-delete.service';
import { UserGetService } from './user-get.service';
import { UserListService } from './user-list.service';
import { UserSetRoleService } from './user-set-role.service';
import { UserUpdateService } from './user-update.service';
import { UserCreateCmdDto, UserDeleteDto, UserGetDto, UserSetRoleDto, UserUpdateDto } from '../../api/dtos/user.dto';
import { ExecutorType } from '../../api/types/auth.types';
export declare class UserService {
    private userCreateService;
    private userUpdateService;
    private userDeleteService;
    private userSetRoleService;
    private userGetService;
    private userListService;
    constructor(userCreateService: UserCreateService, userUpdateService: UserUpdateService, userDeleteService: UserDeleteService, userSetRoleService: UserSetRoleService, userGetService: UserGetService, userListService: UserListService);
    create(userCreateDto: UserCreateCmdDto, executor: ExecutorType): Promise<import("../../entities/user.entity").User>;
    update(userUpdateDto: UserUpdateDto, executor: ExecutorType): Promise<import("../../entities/user.entity").User>;
    delete(userDeleteDto: UserDeleteDto, executor: ExecutorType): Promise<object>;
    setRole(userSetRoleDto: UserSetRoleDto, executor: ExecutorType): Promise<object>;
    get(userGetDto: UserGetDto, executor: ExecutorType): Promise<import("../../entities/user.entity").User>;
    list(executor: ExecutorType): Promise<import("../../api/types/dto-types").ListResponseType<import("../../entities/user.entity").User>>;
}
