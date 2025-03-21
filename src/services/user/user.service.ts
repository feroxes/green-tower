import { Injectable } from '@nestjs/common';
import { UserCreateCmdDto, UserDeleteDto, UserSetRoleDto } from '../../api/dtos/user.dto';
import { UserCreateService } from './user-create.service';
import { UserDeleteService } from './user-delete.service';
import { UserSetRoleService } from './user-set-role.service';
import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserService {
  constructor(
    private userCreateService: UserCreateService,
    private userDeleteService: UserDeleteService,
    private userSetRoleService: UserSetRoleService,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, owner: OwnerTokenType) {
    return this.userCreateService.create(userCreateDto, owner);
  }

  async delete(userDeleteDto: UserDeleteDto, owner: OwnerTokenType) {
    return this.userDeleteService.delete(userDeleteDto, owner);
  }

  async setRole(userSetRoleDto: UserSetRoleDto, owner: OwnerTokenType) {
    return this.userSetRoleService.setRole(userSetRoleDto, owner);
  }
}
