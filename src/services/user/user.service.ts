import { Injectable } from '@nestjs/common';
import { UserCreateCmdDto, UserDeleteDto } from '../../api/dtos/user.dto';
import { UserCreateService } from './user-create.service';
import { UserDeleteService } from './user-delete.service';
import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserService {
  constructor(
    private userCreateService: UserCreateService,
    private userDeleteService: UserDeleteService,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, owner: OwnerTokenType) {
    return this.userCreateService.create(userCreateDto, owner);
  }

  async delete(userDeleteDto: UserDeleteDto, owner: OwnerTokenType) {
    return this.userDeleteService.delete(userDeleteDto, owner);
  }
}
