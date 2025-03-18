import { Injectable } from '@nestjs/common';
import { UserCreateCmdDto } from '../../api/dtos/user.dto';
import { UserCreateService } from './user-create.service';
import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserService {
  constructor(private userCreateService: UserCreateService) {}

  async create(userCreateDto: UserCreateCmdDto, owner: OwnerTokenType) {
    return this.userCreateService.create(userCreateDto, owner);
  }
}
