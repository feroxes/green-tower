import { Injectable } from '@nestjs/common';

import { UserCreateService } from './user-create.service';
import { UserDeleteService } from './user-delete.service';
import { UserGetService } from './user-get.service';
import { UserSetRoleService } from './user-set-role.service';
import { UserUpdateService } from './user-update.service';

import { UserCreateCmdDto, UserDeleteDto, UserGetDto, UserSetRoleDto, UserUpdateDto } from '../../api/dtos/user.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserService {
  constructor(
    private userCreateService: UserCreateService,
    private userUpdateService: UserUpdateService,
    private userDeleteService: UserDeleteService,
    private userSetRoleService: UserSetRoleService,
    private userGetService: UserGetService,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, executor: ExecutorType) {
    return this.userCreateService.create(userCreateDto, executor);
  }

  async update(userUpdateDto: UserUpdateDto, executor: ExecutorType) {
    return this.userUpdateService.update(userUpdateDto, executor);
  }

  async delete(userDeleteDto: UserDeleteDto, executor: ExecutorType) {
    return this.userDeleteService.delete(userDeleteDto, executor);
  }

  async setRole(userSetRoleDto: UserSetRoleDto, executor: ExecutorType) {
    return this.userSetRoleService.setRole(userSetRoleDto, executor);
  }

  async get(userGetDto: UserGetDto, executor: ExecutorType) {
    return this.userGetService.get(userGetDto, executor);
  }
}
