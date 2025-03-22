import { Injectable } from '@nestjs/common';

import { UserCreateService } from './user-create.service';
import { UserDeleteService } from './user-delete.service';
import { UserSetRoleService } from './user-set-role.service';

import { UserCreateCmdDto, UserDeleteDto, UserSetRoleDto } from '../../api/dtos/user.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserService {
  constructor(
    private userCreateService: UserCreateService,
    private userDeleteService: UserDeleteService,
    private userSetRoleService: UserSetRoleService,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, executor: ExecutorType) {
    return this.userCreateService.create(userCreateDto, executor);
  }

  async delete(userDeleteDto: UserDeleteDto, executor: ExecutorType) {
    return this.userDeleteService.delete(userDeleteDto, executor);
  }

  async setRole(userSetRoleDto: UserSetRoleDto, executor: ExecutorType) {
    return this.userSetRoleService.setRole(userSetRoleDto, executor);
  }
}
